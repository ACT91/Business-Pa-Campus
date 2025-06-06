import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  onSnapshot,
  type DocumentData,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../../src/firebase';

type PostTransform<T> = (doc: DocumentData & { id: string }) => T;

export const useEndlessScroll = <T,>(
  collectionName: string,
  orderField: string,
  postsPerLoad: number,
  transform: PostTransform<T>
) => {
  const [items, setItems] = useState<T[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const q = lastVisible
        ? query(
            collection(db, collectionName),
            orderBy(orderField, 'desc'),
            startAfter(lastVisible),
            limit(postsPerLoad)
          )
        : query(
            collection(db, collectionName),
            orderBy(orderField, 'desc'),
            limit(postsPerLoad)
          );

      const snapshot = await getDocs(q);
      const newItems = snapshot.docs.map(doc => transform({ ...doc.data(), id: doc.id }));

      setItems(prev => [...prev, ...newItems]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(newItems.length === postsPerLoad);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastVisible, collectionName, orderField, postsPerLoad, transform]);

  // Initial load with real-time updates
  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy(orderField, 'desc'),
      limit(postsPerLoad)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const newItems = snapshot.docs.map(doc => transform({ ...doc.data(), id: doc.id }));
        setItems(newItems);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
        setHasMore(newItems.length === postsPerLoad);
      },
      (err) => {
        setError(err);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderField, postsPerLoad, transform]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 500 >= 
        document.documentElement.offsetHeight && 
        !loading && 
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, loadMore]);

  return { items, loading, hasMore, error };
};
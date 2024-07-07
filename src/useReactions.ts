import { useState, useEffect } from 'preact/hooks';
import { collection, getDocs, addDoc, Timestamp, DocumentData } from 'firebase/firestore/lite';
import { db } from './firebase';

const useReactions = () => {
    const [reactions, setReactions] = useState<DocumentData[]>([]);

    const fetchReactions = async () => {
        const reactionsCol = collection(db, 'reactions');
        const reactionSnapshot = await getDocs(reactionsCol);
        const reactionList = reactionSnapshot.docs.map(doc => doc.data());
        const sortedReactionList = reactionList.sort((a, b) => b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime());

        setReactions(sortedReactionList);
    };

    useEffect(() => {
        fetchReactions();
    }, []);

    const addReaction = async (intensity: string, trigger: string) => {
        const reactionsCol = collection(db, 'reactions');
        await addDoc(reactionsCol, {
            timestamp: Timestamp.now(),
            intensity,
            trigger
        });
        fetchReactions();
    };

    return { reactions, addReaction };
};

export default useReactions;
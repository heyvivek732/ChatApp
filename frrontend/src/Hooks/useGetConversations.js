import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/users',{
          method:"GET",
          headers:{"Content-Type":"application/json"},
          credentials: 'include',
        })
        if (!res.ok) {
          
          throw new Error(`Error ${res.status}: ${errorText}`);
      }
        const output = await res.json();
        setConversations(output);
      } catch (error) {
        toast.error("Failed to fetch API");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

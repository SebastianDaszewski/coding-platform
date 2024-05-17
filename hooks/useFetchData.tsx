const useFetchData = () => {
  const fetchTasks = async (limit: number) => {
    try {
      const response = await fetch(`/api/js-tasks?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchTasks,
  };
};

export default useFetchData;

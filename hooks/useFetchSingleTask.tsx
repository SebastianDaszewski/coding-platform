const useFetchSingleTask = () => {
  const handleCheckId = async () => {
    try {
      const url = window.location.href;
      const startIndex = url.indexOf("task/") + 5;
      const endIndex = url.indexOf("/", startIndex);
      const taskId = url.substring(startIndex, endIndex);

      return taskId;
    } catch (error) {
      console.error("Error while getting taskId:", error);
      throw error;
    }
  };

  const fetchTaskData = async () => {
    try {
      const taskId = await handleCheckId();
      if (taskId.length > 5) {
        const response = await fetch(`/api/js-tasks/${taskId}`);
        if (!response.ok) {
          throw new Error();
        }
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    fetchTaskData,
  };
};

export default useFetchSingleTask;

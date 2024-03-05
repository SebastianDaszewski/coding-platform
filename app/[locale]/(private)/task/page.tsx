import { EditorProvider } from "@/context/EditorContext";
import { Task } from "@/features/task";

const TaskPage = () => {
  return (
    <EditorProvider>
      <Task />
    </EditorProvider>
  );
};

export default TaskPage;

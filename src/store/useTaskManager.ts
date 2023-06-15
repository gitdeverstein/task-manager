import { create } from "zustand";
import { Task } from "@/pages/tasks";

type State = {
  tasks: Task[];
};

type Actions = {
  find(id: number): Task | undefined;
  add(task: Task): void;
  edit(id: number, newTitle: string): void;
  delete(id: number): void;
};

const useTaskManager = create<State & Actions>((set, get) => ({
  tasks: [],
  add: (task: Task) => {
    set({
      tasks: [...get().tasks, task],
    });
  },
  delete(id: number) {
    const tasks = get().tasks;

    const updated = tasks.reduce(
      (prev: any, current: { id: number; }) => (current.id === id ? prev : [...prev, current]),
      [] as Task[]
    );

    set({ tasks: updated });
  },
  edit(id: number, state: Partial<Task>) {
    const tasks = get().tasks;

    const updated = tasks.reduce((prev, curr) => {
      if (curr.id === id) {
        curr = { ...curr, ...state };
      }
      return [...prev, curr];
    }, [] as Task[]);

    set({
      tasks: updated,
    });
  },
  find(id: number): Task | undefined {
    return get().tasks.find((task) => task.id === id);
  },
}))

export default useTaskManager;

export {
  useTaskManager
}
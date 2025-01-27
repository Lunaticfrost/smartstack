import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService, { Task } from '../../services/taskService';

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
  filters: {
    status?: Task['status'];
    priority?: Task['priority'];
    search?: string;
  };
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  filters: {}
};

// Async Thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (filters: Partial<TaskState['filters']> | undefined, { rejectWithValue }) => {
    try {
      return await taskService.getTasks();
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: Task, { rejectWithValue }) => {
    try {
      return await taskService.createTask(taskData);
    } catch (error) {
      console.error('Failed to create task', error);
      return rejectWithValue('Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }: { id: string, taskData: Partial<Task> }, { rejectWithValue }) => {
    try {
      return await taskService.updateTask(id, taskData);
    } catch (error) {
      console.error('Failed to update task', error);
      return rejectWithValue('Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (error) {
      console.error('Failed to delete task', error);
      return rejectWithValue('Failed to delete task');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch Tasks
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Task
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
      state.currentTask = null;
    });

    // Update Task
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.currentTask = null;
    });

    // Delete Task
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    });
  }
});

export const { 
  setFilters, 
  clearFilters, 
  setCurrentTask 
} = tasksSlice.actions;

export default tasksSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectService } from '@/services/projectService';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await projectService.getProjects();
    console.log(response, 'response');
    return response;
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData: Project) => {
    const response = await projectService.createProject(projectData);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, projectData }: { id: string; projectData: Project }) => {
    const response = await projectService.updateProject(id, projectData);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: string) => {
    await projectService.deleteProject(id);
    return id;
  }
);

export enum ProjectStatus {
  PLANNING = 'Planning',
  IN_PROGRESS = 'In Progress',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  team: {
    _id: string;
    name: string;
    members: Array<{
      _id: string;
      name: string;
      email: string;
    }>;
  };
  tasks: Array<{
    _id: string;
    title: string;
    status: string;
  }>;
  startDate: string;
  endDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      // Create Project
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload as Project);
      })
      // Update Project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p: Project) => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload as Project;
        }
      })
      // Delete Project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p: Project) => p._id !== action.payload);
      });
  }
});

export default projectSlice.reducer;
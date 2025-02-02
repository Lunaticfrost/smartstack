import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { teamService } from '@/services/teamService';

export interface TeamMember {
  _id: string;
  name: string;
  email: string;
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async () => {
    const response = await teamService.getTeams();
    return response;
  }
);

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData: Partial<Team>) => {
    const response = await teamService.createTeam(teamData);
    return response;
  }
);

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async ({ id, teamData }: { id: string; teamData: Partial<Team> }) => {
    const response = await teamService.updateTeam(id, teamData);
    return response;
  }
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async (id: string) => {
    await teamService.deleteTeam(id);
    return id;
  }
);

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    teams: [] as Team[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teams';
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        const index = state.teams.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter(t => t._id !== action.payload);
      });
  },
});

export default teamSlice.reducer; 
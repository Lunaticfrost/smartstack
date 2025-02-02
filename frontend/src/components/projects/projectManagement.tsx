import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import { RootState } from '@/store';
import { 
  fetchProjects, 
  deleteProject, 
  ProjectStatus,
  Project 
} from '@/store/slices/projectSlice';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import ProjectModal from './ProjectModal';

const ProjectManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await dispatch(deleteProject(projectId)).unwrap();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const filteredProjects = projects?.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredProjects, 'filteredProjects');

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
              <button 
                onClick={handleCreateProject}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                <Plus className="mr-2 w-5 h-5" /> Create Project
              </button>
            </div>

            {/* Search */}
            <div className="flex space-x-4 mb-6">
              <div className="relative flex-grow">
                <input 
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Projects Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3 text-left">Start Date</th>
                    <th className="p-3 text-left">End Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects?.map((project) => (
                    <tr key={project._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{project.name}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs
                          ${project.status === ProjectStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-800' :
                            project.status === ProjectStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                            project.status === ProjectStatus.ON_HOLD ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="p-3">{project.team?.name}</td>
                      <td className="p-3">{new Date(project.startDate).toLocaleDateString()}</td>
                      <td className="p-3">{new Date(project.endDate).toLocaleDateString()}</td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEditProject(project)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Projects State */}
            {(!filteredProjects || filteredProjects.length === 0) && (
              <div className="text-center py-10 text-gray-500">
                No projects found. Create your first project!
              </div>
            )}
          </>
        )}

        {/* Project Modal */}
        {isModalOpen && (
          <ProjectModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            project={selectedProject}
          />
        )}
      </div>
  );
};

export default ProjectManagement;
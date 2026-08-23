import ProjectsHero from "../../components/projects/ProjectsHero/ProjectsHero";
import ProjectsOverview from "../../components/projects/ProjectsOverview/ProjectsOverview";
import ProjectDetails from "../../components/projects/ProjectDetails/ProjectDetails";
import ProjectsGrid from "../../components/projects/ProjectsGrid/ProjectsGrid";
import ProjectCategories from "../../components/projects/ProjectCategories/ProjectCategories";
import ProjectsImpact from "../../components/projects/ProjectsImpact/ProjectsImpact";
const Projects = () => {
  return (
    <>
      <ProjectsHero />
      <ProjectsOverview />
      <ProjectDetails />
       <ProjectCategories />
      <ProjectsGrid />
      <ProjectsImpact />
    </>
  );
};

export default Projects;
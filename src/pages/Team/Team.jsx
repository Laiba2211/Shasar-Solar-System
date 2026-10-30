import TeamHero from "../../components/team/TeamHero/TeamHero";
// import TeamMembers from "../../components/team/TeamMembers/TeamMembers";
import ClientInstallations from "../../components/team/ClientInstallations/ClientInstallations";
import TeamAtWork from "../../components/team/TeamAtWork/TeamAtWork";
const Team = () => {
  return (
    <main className="team-page">
      <TeamHero />
    {/* <TeamMembers /> */}
    <ClientInstallations />
    <TeamAtWork />
    </main>
  );
};

export default Team;
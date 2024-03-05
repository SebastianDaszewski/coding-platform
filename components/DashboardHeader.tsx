type DashboardHeaderProps = {
  title: string;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <div className="text-black absolute top-1/2 left-1/2">
      <h1>{title}</h1>
    </div>
  );
};

export default DashboardHeader;

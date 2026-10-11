import { Book, Download, PlayCircle } from "lucide-react";

const ResourcesCard = () => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 p-4 font-semibold border-b border-gray-200">
        Resources
      </div>
      <div className="p-4">
        <div className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
          <Book className="h-5 w-5 text-primary mr-3" />
          <div className="text-sm">Architecture Fundamentals</div>
        </div>
        <div className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
          <Download className="h-5 w-5 text-primary mr-3" />
          <div className="text-sm">Downloadable Templates</div>
        </div>
        <div className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
          <PlayCircle className="h-5 w-5 text-primary mr-3" />
          <div className="text-sm">Video Tutorials</div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesCard;

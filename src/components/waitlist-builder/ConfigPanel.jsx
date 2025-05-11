
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SetupPanel from "./SetupPanel";
import DesignPanel from "./DesignPanel";
import ThemesPanel from "./ThemesPanel";
import ImagesPanel from "./ImagesPanel";
import AdvancedPanel from "./AdvancedPanel";

const ConfigPanel = () => {
  return (
    <Tabs defaultValue="setup" className="w-full">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="setup">Setup</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="themes">Themes</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="advanced">Form Fields</TabsTrigger>
      </TabsList>
      <TabsContent value="setup" className="mt-0">
        <SetupPanel />
      </TabsContent>
      <TabsContent value="design" className="mt-0">
        <DesignPanel />
      </TabsContent>
      <TabsContent value="themes" className="mt-0">
        <ThemesPanel />
      </TabsContent>
      <TabsContent value="images" className="mt-0">
        <ImagesPanel />
      </TabsContent>
      <TabsContent value="advanced" className="mt-0">
        <AdvancedPanel />
      </TabsContent>
    </Tabs>
  );
};

export default ConfigPanel;

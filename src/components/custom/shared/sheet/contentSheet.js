
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const ContentSheet = ({ trigger, content, title, description }) => {

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    {trigger}
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>
                    <div className="no-scrollbar overflow-y-auto px-4">
                        {description}
                    </div>
                    <DrawerFooter>
                        {content}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ContentSheet;

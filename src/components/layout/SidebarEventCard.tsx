import { HStack, AspectRatio, Image, VStack, Text } from "@chakra-ui/react";

type SidebarEventCardProps = {
	activityName: string;
	eventName: string;
    image: string
};

function SidebarEventCard({
	activityName,
	eventName,
    image,
}: SidebarEventCardProps) {
	return (
		<HStack spacing="5" cursor="pointer">
			<AspectRatio ratio={4 / 3} width="14" height="14">
				<Image
					alt=""
                    src={image}
					fallbackSrc="https://www.tripsavvy.com/thmb/LvHd8jPLcmSgH3pnyf8Cy4pAw4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taipei101-tower-taiwan-56ccb69b5f9b5879cc5b6f0a.jpg"
					borderRadius="md"
				/>
			</AspectRatio>
			<VStack alignItems={"start"} spacing="0">
				<Text color="fg-subtle" fontSize="sm">
					{activityName}
				</Text>
				<Text fontSize="md">{eventName}</Text>
			</VStack>
		</HStack>
	);
}

export default SidebarEventCard;

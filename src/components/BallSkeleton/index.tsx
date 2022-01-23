import { Box, Skeleton, SkeletonProps } from "@chakra-ui/react";

interface BallSkeletonProps extends SkeletonProps {
  repeatCount: number;
}

export const BallSkeleton = ({
  repeatCount = 1,
  ...rest
}: BallSkeletonProps) => {
  const howMany = Array.from(Array(repeatCount).keys());

  return (
    <Box
      flexWrap="wrap"
      display="flex"
      w="180px"
      h="100px"
      gap="5"
      justifyContent="flex-start"
    >
      {howMany.map((index) => (
        <Skeleton
          key={index}
          {...rest}
          w="10px"
          h="10px"
          color="gray.6"
          borderRadius="100%"
        />
      ))}
    </Box>
  );
};

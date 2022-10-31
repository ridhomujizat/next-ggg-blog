import { Text, Wrap, Stack } from "@chakra-ui/react";
import Label from "components/LabelCategory";
import { useRouter } from "next/router";

export default function Home3(props) {
  return (
    <Stack spacing={4} py={4} mt={[10, null]}>
      <Stack spacing={4}>
        <Text as="h1" fontSize={["2xl", "2xl", "3xl"]} fontWeight="bold">
          {props.text.categories}
        </Text>
        <Wrap spacing="50px">
          {props.categories?.map((o) => (
            <Label
              key={o.id}
              imageUrl={o.image_url}
              title={o.category_name}
              onClick={() => props.handleParams({ category: o.id })}
            />
          ))}
        </Wrap>
      </Stack>
      {/* <Stack spacing={4}>
        <Text as="h1" fontSize={["2xl", "3xl", "4xl"]} fontWeight="bold">
          Label
        </Text>
        <Wrap spacing="50px" marginY={10}>
          {props.labels?.map((o) => (
            <Label
              key={o.id}
              title={o.label_name}
              onClick={() => props.handleParams({ label: o.id })}
            />
          ))}
        </Wrap>
      </Stack> */}
    </Stack>
  );
}

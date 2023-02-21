import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateUseditemArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_USED_ITEMS } from "../queries/useFetchUseditems";

const CREATE_USED_ITEM = gql`
  mutation createUseditem($createUseditemInput: CreateUseditemInput!) {
    createUseditem(createUseditemInput: $createUseditemInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
    }
  }
`;

export const useCreateUsedItem = () => {
  const router = useRouter();
  const [createUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const createSubmit = async (data: any, resultUrls: string[]) => {
    // console.log(data);
    try {
      const result = await createUseditem({
        variables: {
          createUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: String(data.contents),
            price: parseInt(data.price),
            tags: data.tags,
            images: resultUrls,
          },
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS,
            // variables: {
            //   page: 1,
            // },
          },
        ],
      });

      // console.log(result.data);
      void router.push(`/${String(result?.data?.createUseditem?._id)}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    createSubmit,
  };
};

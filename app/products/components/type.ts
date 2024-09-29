type Documents = {
  id: string;
  comments: string;
  star: number;
  commenter: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
};

export type Data = {
  documents: Documents[];
};

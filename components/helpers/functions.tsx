import { toast } from "react-hot-toast";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import {
  query,
  where,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Notification } from "@/types";
export const customToast = ({
  userFunction,
  successFunc,
  loadingMessage,
  successMessage,
  errorMessage,
  errorFunc,
}: {
  userFunction: () => Promise<any>;
  successFunc?: () => void;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  errorFunc?: () => Promise<any> | (() => void);
}) => {
  return toast.promise(
    userFunction()
      .then(() => {
        if (successFunc) successFunc();
      })
      .catch(async (e) => {
        if (errorFunc) await errorFunc();
        console.log(e);
        throw e;
      }),
    {
      loading: loadingMessage || "Loading...",
      success: successMessage || "Success",
      error: errorMessage || "Something went wrong",
    }
  );
};
export const uploadFile = (file: File, name: string) => {
  const fileRef = ref(storage, `/${name}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url: string) => {
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
export function findItemIdByName<T extends { _id: string; name: string }>(
  name: string,
  items: T[]
): string | undefined {
  const foundItem = items.find((item) => item.name === name);

  if (foundItem) {
    return foundItem._id;
  }
  return undefined;
}
export function findItemNameById<T extends { _id: string; name: string }>(
  id: string,
  items: T[]
): string | undefined {
  const foundItem = items.find((item) => item._id === id);
  return foundItem?.name || "";
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("read", "==", false)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Notification)
      );
      setNotifications(updatedNotifications);
    });
    return () => unsubscribe();
  }, []);
  return { notifications };
};
export const useDeleteNotification = () => {
  const handleRead = (id: string) => {
    const read = async () => {
      await deleteDoc(doc(db, "notifications", id));
      toast.success("Notification deleted successfully");
    };
    customToast({
      userFunction: read,
    });
  };
  return { handleRead };
};

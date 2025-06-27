"use client";
import React, { useRef, useState } from "react";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../../store/apiSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const { data, isLoading } = useGetUserProfileQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateUserProfile, { isLoading: isSaving }] =
    useUpdateUserProfileMutation();

  const [name, setName] = useState(data?.name || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const router = useRouter();

  const backendUrl = "https://alibackend.duckdns.org";

  React.useEffect(() => {
    if (data) setName(data.name || "");
  }, [data]);
  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setName(data?.name || "");
    setProfilePicture(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        name,
        profile_picture: profilePicture || undefined,
      }).unwrap();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      console.log(err.message)
    }
  };

  return (
    <div className=" bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-16 font-montserrat">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-6 ">
            <div className="w-[210px] h-[210px] rounded-full bg-gray-200 flex items-center justify-center">
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={previewUrl || "/default-avatar.jpg"}
                      alt="Avatar"
                      className="object-cover object-top"
                      fill
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => editing && fileInputRef.current?.click()}
                    className={`absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md transition ${
                      editing ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Camera className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              ) : data?.profile_picture ? (
                <div className="relative w-full h-full">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={
                        data.profile_picture.startsWith("http")
                          ? data.profile_picture
                          : `${backendUrl}${data.profile_picture}`
                      }
                      alt="Profile"
                      className="object-cover object-top"
                      fill
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => editing && fileInputRef.current?.click()}
                    className={`absolute bottom-2 right-2 bg-white p-2 z-40 rounded-full shadow-md transition ${
                      editing ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Camera className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              ) : (
                <span className="text-4xl text-gray-400">👤</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className=" pb-4">
              <label
                style={{ wordSpacing: "0.1rem", letterSpacing: "0.01rem" }}
                className="block dark:text-gray-200 text-gray-600 leading-1 font-montserrat mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-md border border-gray-400/40  dark:bg-gray-900 dark:text-gray-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                style={{ wordSpacing: "0.1rem", letterSpacing: "0.01rem" }}
                className="block dark:text-gray-200 text-gray-600 leading-1 font-montserrat mb-2"
              >
                Subscription Type
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-md border border-gray-400/40 dark:bg-gray-900 dark:text-gray-100"
                value={"Free_Trial"}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div
          className={`ml-[14.4rem] ${
            editing ? "block" : "hidden"
          } flex gap-4 items-center`}
        >
          <button
            type="submit"
            className={`px-13 py-4 rounded-full bg-gradient-to-r from-[#061DA9] to-[#5A1FAA] text-white font-semibold hover:bg-blue-700 transition ${
              editing ? "block" : "hidden"
            }   `}
            onClick={() => setEditing(false)}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-13 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#061DA9] to-[#5A1FAA] hover:opacity-90 transition"
          >
            Cancel
          </button>
        </div>

        {success && (
          <div className="text-green-600 font-semibold">
            Profile updated successfully!
          </div>
        )}
      </form>
      <button
        className={`px-13 py-4 rounded-full ml-[14.4rem] bg-gradient-to-r from-[#061DA9] to-[#5A1FAA] text-white font-semibold hover:bg-blue-700 transition ${
          editing ? "hidden" : "block"
        }   `}
        onClick={handleEdit}
      >
        Edit Profile
      </button>
    </div>
  );
}

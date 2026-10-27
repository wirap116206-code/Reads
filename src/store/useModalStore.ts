import { create } from "zustand";

interface ModalState {
  isCreatePostOpen: boolean;
  isEditProfileOpen: boolean;
  isReplyPostOpen: boolean;

  openCreatePost: () => void;
  closeCreatePost: () => void;

  openEditProfile: () => void;
  closeEditProfile: () => void;

  openReplyPost: () => void;
  closeReplyPost: () => void;

  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isCreatePostOpen: false,
  isEditProfileOpen: false,
  isReplyPostOpen: false,

  openCreatePost: () =>
    set({
      isCreatePostOpen: true,
      isEditProfileOpen: false,
      isReplyPostOpen: false,
    }),

  closeCreatePost: () =>
    set({
      isCreatePostOpen: false,
    }),

  openEditProfile: () =>
    set({
      isEditProfileOpen: true,
      isCreatePostOpen: false,
      isReplyPostOpen: false,
    }),

  closeEditProfile: () =>
    set({
      isEditProfileOpen: false,
    }),

  openReplyPost: () =>
    set({
      isReplyPostOpen: true,
      isCreatePostOpen: false,
      isEditProfileOpen: false,
    }),

  closeReplyPost: () =>
    set({
      isReplyPostOpen: false,
    }),

  closeAll: () =>
    set({
      isCreatePostOpen: false,
      isEditProfileOpen: false,
      isReplyPostOpen: false,
    }),
}));

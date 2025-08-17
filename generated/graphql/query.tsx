// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddConversationInputType = {
  items?: InputMaybe<Array<InputMaybe<ConversationItemInputType>>>;
  title: Scalars['String'];
};

export type AddCustomFieldInputType = {
  description?: InputMaybe<Scalars['String']>;
  field: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  inputType?: InputMaybe<CustomFieldInputType>;
  title: Scalars['String'];
};

export type AddCustomerInputType = {
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AddFolderImageInputType = {
  name: Scalars['String'];
  type?: InputMaybe<TypeFile>;
};

export type AddMemberInputType = {
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type AddPostOfUserAppInput = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isDraft?: InputMaybe<Scalars['Boolean']>;
  keywordId: Scalars['ID'];
  outline?: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
  workspaceId: Scalars['ID'];
};

export type AddServiceCategoryInputType = {
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type AddUserAdminInputType = {
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type AiSettingApp = {
  __typename?: 'AiSettingApp';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  leadingSentence?: Maybe<Scalars['String']>;
  max_tokens?: Maybe<Scalars['Int']>;
  type?: Maybe<TypeAiSettingApp>;
};

export type BuyWord = {
  __typename?: 'BuyWord';
  confirmBy?: Maybe<User>;
  confirmById?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  isCancel?: Maybe<Scalars['Boolean']>;
  isConfirm?: Maybe<Scalars['Boolean']>;
  numberWord?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  transactionType?: Maybe<TransactionType>;
  workspace?: Maybe<Workspace>;
  workspaceId?: Maybe<Scalars['ID']>;
};

export type BuyWordsResponseData = {
  __typename?: 'BuyWordsResponseData';
  data?: Maybe<Array<Maybe<BuyWord>>>;
  pagination?: Maybe<PaginationType>;
};

export type ChangeDefaultProjectInputType = {
  default?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ChangeEmailUserInputType = {
  email?: InputMaybe<Scalars['String']>;
  newEmail?: InputMaybe<Scalars['String']>;
};

export type ChangeExpiredTimeWorkspaceInputType = {
  expiredAt: Scalars['DateTime'];
  workspaceId: Scalars['ID'];
};

export type ChangePasswordUserInputType = {
  email?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export enum ChannelType {
  Facebook = 'Facebook',
  Wordpress = 'Wordpress',
  Zalo = 'Zalo'
}

export type Code = {
  __typename?: 'Code';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isExpired?: Maybe<Scalars['Boolean']>;
};

export type ConfirmRequestBuyWordInputType = {
  buyWordId?: InputMaybe<Scalars['ID']>;
  isConfirm?: InputMaybe<Scalars['Boolean']>;
};

export type Content = {
  __typename?: 'Content';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  link?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  serviceId?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export enum ContentTypeEnum {
  Content = 'content',
  Document = 'document'
}

export type ContentsInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type ContentsResponseType = {
  __typename?: 'ContentsResponseType';
  data?: Maybe<Array<Maybe<Content>>>;
  pagination?: Maybe<PaginationType>;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  doc?: Maybe<Image>;
  docId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  projectId?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ConversationType>;
};

export type ConversationItem = {
  __typename?: 'ConversationItem';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
};

export type ConversationItemInputType = {
  conversationId?: InputMaybe<Scalars['ID']>;
  createdById?: InputMaybe<Scalars['ID']>;
  message: Scalars['String'];
};

export enum ConversationType {
  Chat = 'Chat',
  Research = 'Research'
}

export type ConversationsInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<ConversationType>;
};

export type ConversationsRepsonse = {
  __typename?: 'ConversationsRepsonse';
  data?: Maybe<Array<Maybe<Conversation>>>;
  pagination?: Maybe<PaginationType>;
};

export type CreateAiSettingAppInputType = {
  id?: InputMaybe<Scalars['ID']>;
  leadingSentence?: InputMaybe<Scalars['String']>;
  max_tokens?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<TypeAiSettingApp>;
};

export type CreatePaymentHistoryInputType = {
  packageItemId: Scalars['String'];
  transactionType: TransactionType;
};

export type CustomField = {
  __typename?: 'CustomField';
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inputType?: Maybe<CustomFieldInputType>;
  isDelete?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export enum CustomFieldInputType {
  Input = 'Input',
  Language = 'Language',
  StyleContent = 'StyleContent',
  Textarea = 'Textarea'
}

export type DataServiceInputType = {
  categoryId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  leadingLanguage?: InputMaybe<Scalars['String']>;
  leadingSentence?: InputMaybe<Scalars['String']>;
  leadingStyleContent?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<ModelAi>;
  systemMessage?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DataTeamInputType = {
  name?: InputMaybe<Scalars['String']>;
};

export type DataUpdateUserInputType = {
  fullname?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type Document = {
  __typename?: 'Document';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  draftId?: Maybe<Scalars['ID']>;
  hasDraft?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  isDraft?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Keyword>;
  keywordId?: Maybe<Scalars['ID']>;
  outline?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type DocumentDataInputType = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isDraft?: InputMaybe<Scalars['Boolean']>;
  keywordId: Scalars['ID'];
  outline?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type DocumentsInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['ID']>;
  search?: InputMaybe<Scalars['String']>;
};

export type DocumentsResponseType = {
  __typename?: 'DocumentsResponseType';
  data?: Maybe<Array<Maybe<Document>>>;
  pagination?: Maybe<PaginationType>;
};

export type EmailSignup = {
  __typename?: 'EmailSignup';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type FolderImage = {
  __typename?: 'FolderImage';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  totalImage?: Maybe<Scalars['Int']>;
  type?: Maybe<TypeFile>;
};

export type FolderImagesInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['ID']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeFile>;
};

export type FolderImagesResponse = {
  __typename?: 'FolderImagesResponse';
  data?: Maybe<Array<Maybe<FolderImage>>>;
  pagination?: Maybe<PaginationType>;
};

export type ForgotPasswordInputType = {
  email?: InputMaybe<Scalars['String']>;
};

export type GetTotalTokenDocResponseData = {
  __typename?: 'GetTotalTokenDocResponseData';
  totalPrice?: Maybe<Scalars['Float']>;
  totalToken?: Maybe<Scalars['Int']>;
};

export type Image = {
  __typename?: 'Image';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  folder?: Maybe<FolderImage>;
  folderId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  isEmbedded?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']>;
  src?: Maybe<Scalars['String']>;
  type?: Maybe<TypeFile>;
  url?: Maybe<Scalars['String']>;
};

export type ImagesInputType = {
  folderId?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['ID']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeFile>;
};

export type ImagesResponse = {
  __typename?: 'ImagesResponse';
  data?: Maybe<Array<Maybe<Image>>>;
  pagination?: Maybe<PaginationType>;
};

export type Keyword = {
  __typename?: 'Keyword';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
  parentKeyword?: Maybe<Keyword>;
  projectId?: Maybe<Scalars['ID']>;
  subKeywords?: Maybe<Array<Maybe<Keyword>>>;
  value?: Maybe<Scalars['String']>;
};

export type KeywordDataInputType = {
  parentId?: InputMaybe<Scalars['ID']>;
  value: Scalars['String'];
};

export type KeywordsInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type KeywordsOfUserAppInput = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['ID']>;
};

export type KeywordsOfUserAppResponse = {
  __typename?: 'KeywordsOfUserAppResponse';
  data?: Maybe<Array<Maybe<Keyword>>>;
  pagination?: Maybe<PaginationType>;
};

export type KeywordsResponse = {
  __typename?: 'KeywordsResponse';
  data?: Maybe<Array<Maybe<Keyword>>>;
  pagination?: Maybe<PaginationType>;
};

export type Language = {
  __typename?: 'Language';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ListBuyWordAdminInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type ListMessageConversationInputType = {
  conversationId?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type ListMessageConversationResponse = {
  __typename?: 'ListMessageConversationResponse';
  data?: Maybe<Array<Maybe<ConversationItem>>>;
  pagination?: Maybe<PaginationType>;
};

export type LoginAppInput = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type LoginInputType = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export enum ModelAi {
  Davinci = 'Davinci',
  Gpt = 'GPT',
  Gpt4 = 'GPT4'
}

export type Mutation = {
  __typename?: 'Mutation';
  addConversation?: Maybe<Conversation>;
  addCustomField?: Maybe<CustomField>;
  addCustomer?: Maybe<User>;
  addFolderImage?: Maybe<FolderImage>;
  addKeyword?: Maybe<Keyword>;
  addMember?: Maybe<User>;
  addMessageInConversation?: Maybe<ConversationItem>;
  addPostOfUserApp?: Maybe<Document>;
  addProject?: Maybe<Project>;
  addService?: Maybe<Service>;
  addServiceCategory?: Maybe<ServiceCategory>;
  addTeam?: Maybe<Team>;
  addUserAdmin?: Maybe<User>;
  addWpPost?: Maybe<Scalars['Boolean']>;
  cancelPaymentHistory?: Maybe<PaymentHistory>;
  changeDefaultProject?: Maybe<Project>;
  changeDefaultProjectUser?: Maybe<Project>;
  changeDefaultTeam?: Maybe<User>;
  changeEmail?: Maybe<Scalars['Boolean']>;
  changeExpiredTimeWorkspace?: Maybe<Workspace>;
  changePassword?: Maybe<Scalars['Boolean']>;
  confirmPaymentHistory?: Maybe<PaymentHistory>;
  confirmPaymentHistory1?: Maybe<PaymentHistory>;
  confirmRequestBuyWord?: Maybe<Scalars['Boolean']>;
  connectFacebookPage?: Maybe<Scalars['Boolean']>;
  createAiSettingApp?: Maybe<AiSettingApp>;
  createCode?: Maybe<Array<Maybe<Scalars['Int']>>>;
  createDocument?: Maybe<Document>;
  createPaymentHistory?: Maybe<Scalars['Boolean']>;
  createTableSupabase?: Maybe<Scalars['Boolean']>;
  deleteContent?: Maybe<Scalars['Boolean']>;
  deleteConversation?: Maybe<Scalars['Boolean']>;
  deleteCustomField?: Maybe<Scalars['Boolean']>;
  deleteDocument?: Maybe<Scalars['Boolean']>;
  deleteFolderImage?: Maybe<Scalars['Boolean']>;
  deleteImage?: Maybe<Scalars['Boolean']>;
  deleteKeyword?: Maybe<Scalars['Boolean']>;
  deleteLanguage?: Maybe<Scalars['Boolean']>;
  deleteMember?: Maybe<Scalars['Boolean']>;
  deleteMessageInConversation?: Maybe<Scalars['Boolean']>;
  deletePageChannel?: Maybe<Scalars['Boolean']>;
  deletePaymentHistory?: Maybe<Scalars['Boolean']>;
  deletePostOfUserApp?: Maybe<Scalars['Boolean']>;
  deleteProject?: Maybe<Scalars['Boolean']>;
  deleteService?: Maybe<Scalars['Boolean']>;
  deleteServiceCategory?: Maybe<Scalars['Boolean']>;
  deleteStyleContent?: Maybe<Scalars['Boolean']>;
  deleteTeam?: Maybe<Scalars['Boolean']>;
  embeddedDocument?: Maybe<Scalars['Boolean']>;
  embeddedDocument1?: Maybe<Scalars['Boolean']>;
  embeddedDocument3?: Maybe<Scalars['Boolean']>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  generateImageWithReplicate?: Maybe<Scalars['String']>;
  getTotalTokenDoc?: Maybe<GetTotalTokenDocResponseData>;
  login?: Maybe<User>;
  loginApp?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  payContentAI?: Maybe<Scalars['Boolean']>;
  payRequestAiContent?: Maybe<Scalars['Int']>;
  reSearchDocument?: Maybe<Scalars['String']>;
  requestBuyWord?: Maybe<BuyWord>;
  resetPassword?: Maybe<Scalars['Boolean']>;
  saveDraftDocument?: Maybe<Document>;
  signUp?: Maybe<User>;
  signUpWithCode?: Maybe<User>;
  signupVerify?: Maybe<Scalars['Boolean']>;
  signupVerify1?: Maybe<Scalars['Boolean']>;
  syncContentPageChannel?: Maybe<Scalars['Boolean']>;
  testSendEmail?: Maybe<Scalars['String']>;
  updateContent?: Maybe<Content>;
  updateConversation?: Maybe<Conversation>;
  updateDocument?: Maybe<Document>;
  updateFolderImage?: Maybe<FolderImage>;
  updateImage?: Maybe<Image>;
  updateKeyword?: Maybe<Keyword>;
  updateLanguage?: Maybe<Language>;
  updatePackage?: Maybe<Package>;
  updatePackageItem?: Maybe<PackageItem>;
  updatePackagePeriod?: Maybe<PackagePeriod>;
  updatePageChannel?: Maybe<PageChannel>;
  updateProject?: Maybe<Project>;
  updateService?: Maybe<Service>;
  updateServiceCategory?: Maybe<ServiceCategory>;
  updateSetting?: Maybe<Setting>;
  updateStyleContent?: Maybe<StyleContent>;
  updateTeam?: Maybe<Team>;
  updateTimeUseGpt4?: Maybe<WorkspacePackage>;
  updateUser?: Maybe<User>;
  updateWorkspace?: Maybe<Workspace>;
  updateWorkspaceAdmin?: Maybe<Workspace>;
};


export type MutationAddConversationArgs = {
  input?: InputMaybe<AddConversationInputType>;
};


export type MutationAddCustomFieldArgs = {
  input?: InputMaybe<AddCustomFieldInputType>;
};


export type MutationAddCustomerArgs = {
  input?: InputMaybe<AddCustomerInputType>;
};


export type MutationAddFolderImageArgs = {
  input?: InputMaybe<AddFolderImageInputType>;
};


export type MutationAddKeywordArgs = {
  input?: InputMaybe<KeywordDataInputType>;
};


export type MutationAddMemberArgs = {
  input?: InputMaybe<AddMemberInputType>;
};


export type MutationAddMessageInConversationArgs = {
  input?: InputMaybe<ConversationItemInputType>;
};


export type MutationAddPostOfUserAppArgs = {
  input?: InputMaybe<AddPostOfUserAppInput>;
};


export type MutationAddProjectArgs = {
  input?: InputMaybe<ProjectDataInputType>;
};


export type MutationAddServiceArgs = {
  input?: InputMaybe<DataServiceInputType>;
};


export type MutationAddServiceCategoryArgs = {
  input?: InputMaybe<AddServiceCategoryInputType>;
};


export type MutationAddTeamArgs = {
  input?: InputMaybe<DataTeamInputType>;
};


export type MutationAddUserAdminArgs = {
  input?: InputMaybe<AddUserAdminInputType>;
};


export type MutationCancelPaymentHistoryArgs = {
  id: Scalars['ID'];
};


export type MutationChangeDefaultProjectArgs = {
  input?: InputMaybe<ChangeDefaultProjectInputType>;
};


export type MutationChangeDefaultProjectUserArgs = {
  projectId: Scalars['ID'];
};


export type MutationChangeDefaultTeamArgs = {
  teamId?: InputMaybe<Scalars['ID']>;
};


export type MutationChangeEmailArgs = {
  input?: InputMaybe<ChangeEmailUserInputType>;
};


export type MutationChangeExpiredTimeWorkspaceArgs = {
  input?: InputMaybe<ChangeExpiredTimeWorkspaceInputType>;
};


export type MutationChangePasswordArgs = {
  input?: InputMaybe<ChangePasswordUserInputType>;
};


export type MutationConfirmPaymentHistoryArgs = {
  id: Scalars['ID'];
};


export type MutationConfirmPaymentHistory1Args = {
  id: Scalars['ID'];
};


export type MutationConfirmRequestBuyWordArgs = {
  input?: InputMaybe<ConfirmRequestBuyWordInputType>;
};


export type MutationCreateAiSettingAppArgs = {
  input?: InputMaybe<CreateAiSettingAppInputType>;
};


export type MutationCreateDocumentArgs = {
  input?: InputMaybe<DocumentDataInputType>;
};


export type MutationCreatePaymentHistoryArgs = {
  input?: InputMaybe<CreatePaymentHistoryInputType>;
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteConversationArgs = {
  conversationId?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteCustomFieldArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteFolderImageArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteImageArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteKeywordArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLanguageArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMemberArgs = {
  memberId: Scalars['ID'];
};


export type MutationDeleteMessageInConversationArgs = {
  messageId: Scalars['ID'];
};


export type MutationDeletePageChannelArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeletePaymentHistoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePostOfUserAppArgs = {
  postId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationDeleteServiceArgs = {
  id: Scalars['String'];
};


export type MutationDeleteServiceCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteStyleContentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationEmbeddedDocumentArgs = {
  documentId?: InputMaybe<Scalars['ID']>;
};


export type MutationEmbeddedDocument1Args = {
  documentId?: InputMaybe<Scalars['ID']>;
};


export type MutationEmbeddedDocument3Args = {
  documentId?: InputMaybe<Scalars['ID']>;
};


export type MutationForgotPasswordArgs = {
  input?: InputMaybe<ForgotPasswordInputType>;
};


export type MutationGenerateImageWithReplicateArgs = {
  prompt?: InputMaybe<Scalars['String']>;
};


export type MutationGetTotalTokenDocArgs = {
  url?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInputType>;
};


export type MutationLoginAppArgs = {
  input?: InputMaybe<LoginAppInput>;
};


export type MutationPayContentAiArgs = {
  content?: InputMaybe<Scalars['String']>;
};


export type MutationPayRequestAiContentArgs = {
  content?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Int']>;
};


export type MutationReSearchDocumentArgs = {
  input?: InputMaybe<ReSearchDocumentInputType>;
};


export type MutationRequestBuyWordArgs = {
  input?: InputMaybe<RequestBuyWordInputType>;
};


export type MutationResetPasswordArgs = {
  input?: InputMaybe<ResetPasswordInputType>;
};


export type MutationSaveDraftDocumentArgs = {
  input?: InputMaybe<UpdateDocumentInputType>;
};


export type MutationSignUpArgs = {
  input?: InputMaybe<SignupInputType>;
};


export type MutationSignUpWithCodeArgs = {
  input?: InputMaybe<SignupWithCodeInputType>;
};


export type MutationSignupVerifyArgs = {
  email: Scalars['String'];
};


export type MutationSignupVerify1Args = {
  email: Scalars['String'];
};


export type MutationSyncContentPageChannelArgs = {
  input?: InputMaybe<SyncContentPageChannelInputType>;
};


export type MutationTestSendEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateContentArgs = {
  input?: InputMaybe<UpdateContentInputType>;
};


export type MutationUpdateConversationArgs = {
  input?: InputMaybe<UpdateConversationInputType>;
};


export type MutationUpdateDocumentArgs = {
  input?: InputMaybe<UpdateDocumentInputType>;
};


export type MutationUpdateFolderImageArgs = {
  input?: InputMaybe<UpdateFolderImageInputType>;
};


export type MutationUpdateImageArgs = {
  input?: InputMaybe<UpdateImageInputType>;
};


export type MutationUpdateKeywordArgs = {
  input?: InputMaybe<UpdateKeywordInputType>;
};


export type MutationUpdateLanguageArgs = {
  input?: InputMaybe<UpdateLanguageInputType>;
};


export type MutationUpdatePackageArgs = {
  input?: InputMaybe<UpdatePackageInputType>;
};


export type MutationUpdatePackageItemArgs = {
  input?: InputMaybe<UpdatePackageItemInputType>;
};


export type MutationUpdatePackagePeriodArgs = {
  input?: InputMaybe<UpdatePackagePeriodInputType>;
};


export type MutationUpdatePageChannelArgs = {
  input?: InputMaybe<UpdatePageChannelInputType>;
};


export type MutationUpdateProjectArgs = {
  input?: InputMaybe<UpdateProjectInputType>;
};


export type MutationUpdateServiceArgs = {
  input?: InputMaybe<UpdateServiceInputType>;
};


export type MutationUpdateServiceCategoryArgs = {
  input?: InputMaybe<UpdateServiceCategoryInputType>;
};


export type MutationUpdateSettingArgs = {
  input?: InputMaybe<UpdateSettingInputType>;
};


export type MutationUpdateStyleContentArgs = {
  input?: InputMaybe<UpdateStyleContentInputType>;
};


export type MutationUpdateTeamArgs = {
  input?: InputMaybe<UpdateTeamInputType>;
};


export type MutationUpdateTimeUseGpt4Args = {
  workspacePackageId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInputType>;
};


export type MutationUpdateWorkspaceArgs = {
  input?: InputMaybe<UpdateWorkspaceInputType>;
};


export type MutationUpdateWorkspaceAdminArgs = {
  input?: InputMaybe<UpdateWorkspaceAdminInputType>;
};

export type Package = {
  __typename?: 'Package';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isShow?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  packageItems?: Maybe<Array<Maybe<PackageItem>>>;
  type?: Maybe<PackageType>;
};

export type PackageItem = {
  __typename?: 'PackageItem';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  freeTime?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  numberWord?: Maybe<Scalars['Int']>;
  packageParent?: Maybe<Package>;
  packageParentId?: Maybe<Scalars['ID']>;
  packagePeriod?: Maybe<PackagePeriod>;
  packagePeriodId?: Maybe<Scalars['ID']>;
  price?: Maybe<Scalars['Int']>;
};

export type PackagePeriod = {
  __typename?: 'PackagePeriod';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['Int']>;
};

export enum PackageType {
  Basic = 'Basic',
  Premium = 'Premium',
  Trial = 'Trial'
}

export type PageChannel = {
  __typename?: 'PageChannel';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  pageChannelId?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  type?: Maybe<ChannelType>;
  url?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type PageChannelsInputType = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  isAll?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<ChannelType>;
};

export type PageChannelsResponseData = {
  __typename?: 'PageChannelsResponseData';
  data?: Maybe<Array<Maybe<PageChannel>>>;
  pagination?: Maybe<PaginationType>;
};

export type PaginationType = {
  __typename?: 'PaginationType';
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type PaymentHistoriesAdminInputType = {
  isConfirm?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type PaymentHistoriesInputType = {
  isConfirm?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type PaymentHistoriesResponse = {
  __typename?: 'PaymentHistoriesResponse';
  data?: Maybe<Array<Maybe<PaymentHistory>>>;
  pagination?: Maybe<PaginationType>;
};

export type PaymentHistory = {
  __typename?: 'PaymentHistory';
  amount?: Maybe<Scalars['Int']>;
  cancelBy?: Maybe<User>;
  cancelById: Scalars['ID'];
  confirmAt?: Maybe<Scalars['String']>;
  confirmBy?: Maybe<User>;
  confirmById?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  isCancel?: Maybe<Scalars['Boolean']>;
  isConfirm?: Maybe<Scalars['Boolean']>;
  packageItem?: Maybe<PackageItem>;
  packageItemId?: Maybe<Scalars['ID']>;
  transactionType?: Maybe<TransactionType>;
  workspaceId?: Maybe<Scalars['ID']>;
};

export type Pexels = {
  __typename?: 'Pexels';
  alt?: Maybe<Scalars['String']>;
  avg_color?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  src?: Maybe<Scalars['String']>;
};

export type PexelsPhotosInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type PexelsPhotosResponseData = {
  __typename?: 'PexelsPhotosResponseData';
  data?: Maybe<Array<Maybe<Pexels>>>;
  pagination?: Maybe<PaginationType>;
};

export type PostOfProjectAppInput = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['ID'];
  workspaceId: Scalars['ID'];
};

export type PostOfUserAppResponse = {
  __typename?: 'PostOfUserAppResponse';
  data?: Maybe<Array<Maybe<Document>>>;
  pagination?: Maybe<PaginationType>;
};

export type PricingResponse = {
  __typename?: 'PricingResponse';
  packages?: Maybe<Array<Maybe<Package>>>;
  periods?: Maybe<Array<Maybe<PackagePeriod>>>;
};

export type Project = {
  __typename?: 'Project';
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  default?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ProjectDataInputType = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type ProjectOfUserAppInput = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  teamId: Scalars['ID'];
};

export type ProjectOfUserAppResponse = {
  __typename?: 'ProjectOfUserAppResponse';
  data?: Maybe<Array<Maybe<Project>>>;
  pagination?: Maybe<PaginationType>;
};

export type ProjectsInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type ProjectsResponseType = {
  __typename?: 'ProjectsResponseType';
  data?: Maybe<Array<Maybe<Project>>>;
  pagination?: Maybe<PaginationType>;
};

export type Query = {
  __typename?: 'Query';
  aiSettingApps?: Maybe<Array<Maybe<AiSettingApp>>>;
  code?: Maybe<Code>;
  content?: Maybe<Content>;
  contents?: Maybe<ContentsResponseType>;
  conversation?: Maybe<Conversation>;
  conversationDefault?: Maybe<Conversation>;
  conversations?: Maybe<ConversationsRepsonse>;
  customFields?: Maybe<Array<Maybe<CustomField>>>;
  document?: Maybe<Document>;
  documents?: Maybe<DocumentsResponseType>;
  folderImage?: Maybe<FolderImage>;
  folderImages?: Maybe<FolderImagesResponse>;
  getEmailSignup?: Maybe<EmailSignup>;
  image?: Maybe<Image>;
  images?: Maybe<ImagesResponse>;
  keyword?: Maybe<Keyword>;
  keywords?: Maybe<KeywordsResponse>;
  keywordsOfUserApp?: Maybe<KeywordsOfUserAppResponse>;
  languages?: Maybe<Array<Maybe<Language>>>;
  listBuyWordAdmin?: Maybe<BuyWordsResponseData>;
  listMessageConversation?: Maybe<ListMessageConversationResponse>;
  me?: Maybe<User>;
  packagePeriods?: Maybe<Array<Maybe<PackagePeriod>>>;
  packages?: Maybe<Array<Maybe<Package>>>;
  pageChannels?: Maybe<PageChannelsResponseData>;
  paymentHistoriesAdmin?: Maybe<PaymentHistoriesResponse>;
  paymentHistoriesUser?: Maybe<PaymentHistoriesResponse>;
  pexelsPhotos?: Maybe<PexelsPhotosResponseData>;
  postOfUserApp?: Maybe<Document>;
  postsOfUserApp?: Maybe<PostOfUserAppResponse>;
  pricing?: Maybe<PricingResponse>;
  project?: Maybe<Project>;
  projectDefault?: Maybe<Project>;
  projectOfUserApp?: Maybe<ProjectOfUserAppResponse>;
  projects?: Maybe<ProjectsResponseType>;
  requestHistories?: Maybe<RequestHistoriesResponseData>;
  researchDocument1?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  serviceCategories?: Maybe<ServiceCategoriesResponseType>;
  serviceCategoriesCustomer?: Maybe<Array<Maybe<ServiceCategory>>>;
  serviceCategory?: Maybe<ServiceCategory>;
  services?: Maybe<ServicesResponseType>;
  servicesDashboard?: Maybe<ServicesResponseType>;
  setting?: Maybe<Setting>;
  styleContents?: Maybe<Array<Maybe<StyleContent>>>;
  subKeywords?: Maybe<KeywordsResponse>;
  team?: Maybe<Team>;
  teamDefault?: Maybe<Team>;
  teams?: Maybe<Array<Maybe<Team>>>;
  testSupabase?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  userInfoApp?: Maybe<User>;
  users?: Maybe<UsersDataResponse>;
  workspace?: Maybe<Workspace>;
  workspacePackage?: Maybe<WorkspacePackage>;
  workspaces?: Maybe<Array<Maybe<Workspace>>>;
  wpPosts?: Maybe<Scalars['String']>;
};


export type QueryCodeArgs = {
  code: Scalars['String'];
};


export type QueryContentArgs = {
  id: Scalars['ID'];
};


export type QueryContentsArgs = {
  input?: InputMaybe<ContentsInputType>;
};


export type QueryConversationArgs = {
  conversationId?: InputMaybe<Scalars['ID']>;
};


export type QueryConversationDefaultArgs = {
  projectId?: InputMaybe<Scalars['ID']>;
};


export type QueryConversationsArgs = {
  input?: InputMaybe<ConversationsInputType>;
};


export type QueryDocumentArgs = {
  id: Scalars['String'];
  isDraft?: InputMaybe<Scalars['Boolean']>;
};


export type QueryDocumentsArgs = {
  input?: InputMaybe<DocumentsInputType>;
};


export type QueryFolderImageArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFolderImagesArgs = {
  input?: InputMaybe<FolderImagesInputType>;
};


export type QueryGetEmailSignupArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type QueryImageArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryImagesArgs = {
  input?: InputMaybe<ImagesInputType>;
};


export type QueryKeywordArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryKeywordsArgs = {
  input?: InputMaybe<KeywordsInputType>;
};


export type QueryKeywordsOfUserAppArgs = {
  input?: InputMaybe<KeywordsOfUserAppInput>;
};


export type QueryListBuyWordAdminArgs = {
  input?: InputMaybe<ListBuyWordAdminInputType>;
};


export type QueryListMessageConversationArgs = {
  input?: InputMaybe<ListMessageConversationInputType>;
};


export type QueryPackagePeriodsArgs = {
  isActive?: InputMaybe<Scalars['Boolean']>;
};


export type QueryPageChannelsArgs = {
  input?: InputMaybe<PageChannelsInputType>;
};


export type QueryPaymentHistoriesAdminArgs = {
  input?: InputMaybe<PaymentHistoriesAdminInputType>;
};


export type QueryPaymentHistoriesUserArgs = {
  input?: InputMaybe<PaymentHistoriesInputType>;
};


export type QueryPexelsPhotosArgs = {
  input?: InputMaybe<PexelsPhotosInputType>;
};


export type QueryPostOfUserAppArgs = {
  postId?: InputMaybe<Scalars['ID']>;
};


export type QueryPostsOfUserAppArgs = {
  input?: InputMaybe<PostOfProjectAppInput>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryProjectOfUserAppArgs = {
  input?: InputMaybe<ProjectOfUserAppInput>;
};


export type QueryProjectsArgs = {
  input?: InputMaybe<ProjectsInputType>;
};


export type QueryRequestHistoriesArgs = {
  input?: InputMaybe<RequestHistoriesInputType>;
};


export type QueryResearchDocument1Args = {
  question?: InputMaybe<Scalars['String']>;
};


export type QueryServiceArgs = {
  id: Scalars['String'];
};


export type QueryServiceCategoriesArgs = {
  input?: InputMaybe<ServiceCategoriesInputType>;
};


export type QueryServiceCategoriesCustomerArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryServiceCategoryArgs = {
  id: Scalars['String'];
};


export type QueryServicesArgs = {
  input?: InputMaybe<ServicesInputType>;
};


export type QueryServicesDashboardArgs = {
  input?: InputMaybe<ServicesInputType>;
};


export type QuerySubKeywordsArgs = {
  input?: InputMaybe<SubKeywordsInputType>;
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUserInfoAppArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UsersInputType>;
};


export type QueryWorkspaceArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryWorkspacePackageArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ReSearchDocumentInputType = {
  documentId?: InputMaybe<Scalars['ID']>;
  question?: InputMaybe<Scalars['String']>;
};

export type RequestBuyWordInputType = {
  numberWord: Scalars['Int'];
  price: Scalars['Int'];
  transactionType: TransactionType;
};

export type RequestHistoriesInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type RequestHistoriesResponseData = {
  __typename?: 'RequestHistoriesResponseData';
  data?: Maybe<Array<Maybe<RequestHistory>>>;
  pagination?: Maybe<PaginationType>;
};

export type RequestHistory = {
  __typename?: 'RequestHistory';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  price?: Maybe<Scalars['Float']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']>;
  tokens?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
  workspace?: Maybe<Workspace>;
  workspaceId?: Maybe<Scalars['ID']>;
};

export type ResetPasswordInputType = {
  code?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Service = {
  __typename?: 'Service';
  category?: Maybe<ServiceCategory>;
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  customFieldIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  customFields?: Maybe<Array<Maybe<CustomField>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isDelete?: Maybe<Scalars['Boolean']>;
  leadingLanguage?: Maybe<Scalars['String']>;
  leadingSentence?: Maybe<Scalars['String']>;
  leadingStyleContent?: Maybe<Scalars['String']>;
  model?: Maybe<ModelAi>;
  slug?: Maybe<Scalars['String']>;
  systemMessage?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ServiceCategoriesInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type ServiceCategoriesResponseType = {
  __typename?: 'ServiceCategoriesResponseType';
  data?: Maybe<Array<Maybe<ServiceCategory>>>;
  pagination?: Maybe<PaginationType>;
};

export type ServiceCategory = {
  __typename?: 'ServiceCategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  order?: Maybe<Scalars['Int']>;
  services?: Maybe<Array<Maybe<Service>>>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ServicesInputType = {
  categoryId?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type ServicesResponseType = {
  __typename?: 'ServicesResponseType';
  data?: Maybe<Array<Maybe<Service>>>;
  pagination?: Maybe<PaginationType>;
};

export type Setting = {
  __typename?: 'Setting';
  bonusBalanceSignup?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  documentLink?: Maybe<Scalars['String']>;
  fieldDescription?: Maybe<Scalars['String']>;
  fieldLanguage?: Maybe<Scalars['String']>;
  fieldMainKeyword?: Maybe<Scalars['String']>;
  fieldParagraph?: Maybe<Scalars['String']>;
  fieldStyleContent?: Maybe<Scalars['String']>;
  fieldSubKeyword?: Maybe<Scalars['String']>;
  fieldTitle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  numberOfTimeUseGpt4?: Maybe<Scalars['Int']>;
  priceToken?: Maybe<Scalars['Float']>;
  timeTrial?: Maybe<Scalars['Int']>;
};

export type SignupInputType = {
  email: Scalars['String'];
  fullname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  username: Scalars['String'];
};

export type SignupWithCodeInputType = {
  code: Scalars['String'];
  fullname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  username: Scalars['String'];
};

export type StyleContent = {
  __typename?: 'StyleContent';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SubKeywordsInputType = {
  parentId: Scalars['ID'];
  query?: InputMaybe<KeywordsInputType>;
};

export type SyncContentPageChannelInputType = {
  channelType?: InputMaybe<ChannelType>;
  content: Scalars['String'];
  contentId: Scalars['ID'];
  contentType?: InputMaybe<ContentTypeEnum>;
  pageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Team = {
  __typename?: 'Team';
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  default?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  memberIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  members?: Maybe<Array<Maybe<User>>>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['ID']>;
};

export enum TransactionType {
  TransferPayment = 'TransferPayment'
}

/** Type ai setting document generate */
export enum TypeAiSettingApp {
  Content = 'Content',
  Description = 'Description',
  Insert = 'Insert',
  Outline = 'Outline',
  Rewrite = 'Rewrite',
  Title = 'Title',
  Write = 'Write'
}

export enum TypeFile {
  Document = 'Document',
  Image = 'Image'
}

export type UpdateContentInputType = {
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateConversationInputType = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type UpdateDocumentInputType = {
  data?: InputMaybe<DocumentDataInputType>;
  id?: InputMaybe<Scalars['ID']>;
};

export type UpdateFolderImageInputType = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateImageInputType = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateKeywordDataInputType = {
  value?: InputMaybe<Scalars['String']>;
};

export type UpdateKeywordInputType = {
  data?: InputMaybe<UpdateKeywordDataInputType>;
  id: Scalars['ID'];
};

export type UpdateLanguageInputType = {
  id?: InputMaybe<Scalars['ID']>;
  isDefault?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type UpdatePackageInputType = {
  id?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isShow?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PackageType>;
};

export type UpdatePackageItemInputType = {
  content?: InputMaybe<Scalars['String']>;
  freeTime?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  numberWord?: InputMaybe<Scalars['Int']>;
  packageParentId?: InputMaybe<Scalars['ID']>;
  packagePeriodId?: InputMaybe<Scalars['ID']>;
  price?: InputMaybe<Scalars['Int']>;
};

export type UpdatePackagePeriodInputType = {
  id?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  time?: InputMaybe<Scalars['Int']>;
};

export type UpdatePageChannelInputType = {
  id?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ChannelType>;
  url?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInputType = {
  data?: InputMaybe<ProjectDataInputType>;
  id?: InputMaybe<Scalars['ID']>;
};

export type UpdateServiceCategoryInputType = {
  data?: InputMaybe<AddServiceCategoryInputType>;
  id: Scalars['ID'];
  order?: InputMaybe<Scalars['Int']>;
};

export type UpdateServiceInputType = {
  data?: InputMaybe<DataServiceInputType>;
  id?: InputMaybe<Scalars['ID']>;
};

export type UpdateSettingInputType = {
  bonusBalanceSignup?: InputMaybe<Scalars['Float']>;
  documentLink?: InputMaybe<Scalars['String']>;
  fieldDescription?: InputMaybe<Scalars['String']>;
  fieldLanguage?: InputMaybe<Scalars['String']>;
  fieldMainKeyword?: InputMaybe<Scalars['String']>;
  fieldParagraph?: InputMaybe<Scalars['String']>;
  fieldStyleContent?: InputMaybe<Scalars['String']>;
  fieldSubKeyword?: InputMaybe<Scalars['String']>;
  fieldTitle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  numberOfTimeUseGpt4?: InputMaybe<Scalars['Int']>;
  priceToken?: InputMaybe<Scalars['Float']>;
  timeTrial?: InputMaybe<Scalars['Int']>;
};

export type UpdateStyleContentInputType = {
  id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type UpdateTeamInputType = {
  data?: InputMaybe<DataTeamInputType>;
  id?: InputMaybe<Scalars['ID']>;
};

export type UpdateUserInputType = {
  data?: InputMaybe<DataUpdateUserInputType>;
};

export type UpdateWorkspaceAdminInputType = {
  balance?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  isTrial?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateWorkspaceInputType = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultProject?: Maybe<Project>;
  defaultProjectId?: Maybe<Scalars['ID']>;
  defaultTeamId?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  fullname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDeveloper?: Maybe<Scalars['Boolean']>;
  isVerify?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  username: Scalars['String'];
  workspace?: Maybe<Workspace>;
  workspaceId?: Maybe<Scalars['ID']>;
};

/** Role of user */
export enum UserRole {
  Admin = 'Admin',
  AdminStaff = 'AdminStaff',
  RootAdmin = 'RootAdmin',
  Staff = 'Staff',
  User = 'User'
}

export type UsersDataResponse = {
  __typename?: 'UsersDataResponse';
  data?: Maybe<Array<Maybe<User>>>;
  pagination?: Maybe<PaginationType>;
};

export type UsersInputType = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  balance?: Maybe<Scalars['Float']>;
  bucket?: Maybe<Scalars['String']>;
  bucketSize?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  expiredAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  isOwner?: Maybe<Scalars['Boolean']>;
  isTrial?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['ID']>;
  timeTrial?: Maybe<Scalars['Int']>;
  workspacePackage?: Maybe<WorkspacePackage>;
};

export type WorkspacePackage = {
  __typename?: 'WorkspacePackage';
  createdAt?: Maybe<Scalars['DateTime']>;
  freeTime?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  numberWord?: Maybe<Scalars['Int']>;
  packageItem?: Maybe<PackageItem>;
  packageItemId?: Maybe<Scalars['ID']>;
  startDateWord?: Maybe<Scalars['DateTime']>;
  time?: Maybe<Scalars['Int']>;
  timeUseGpt4?: Maybe<Scalars['Int']>;
};

export type AiSettingAppInfoFragment = { __typename?: 'AiSettingApp', id?: string | null, type?: TypeAiSettingApp | null, leadingSentence?: string | null, max_tokens?: number | null };

export type AiSettingAppsQueryVariables = Exact<{ [key: string]: never; }>;


export type AiSettingAppsQuery = { __typename?: 'Query', aiSettingApps?: Array<{ __typename?: 'AiSettingApp', id?: string | null, type?: TypeAiSettingApp | null, leadingSentence?: string | null, max_tokens?: number | null } | null> | null };

export type CreateAiSettingAppMutationVariables = Exact<{
  input?: InputMaybe<CreateAiSettingAppInputType>;
}>;


export type CreateAiSettingAppMutation = { __typename?: 'Mutation', createAiSettingApp?: { __typename?: 'AiSettingApp', id?: string | null, type?: TypeAiSettingApp | null, leadingSentence?: string | null, max_tokens?: number | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type LoginMutationVariables = Exact<{
  input?: InputMaybe<LoginInputType>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type SignupVerifyMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignupVerifyMutation = { __typename?: 'Mutation', signupVerify?: boolean | null };

export type SignupWithCodeMutationVariables = Exact<{
  input?: InputMaybe<SignupWithCodeInputType>;
}>;


export type SignupWithCodeMutation = { __typename?: 'Mutation', signUpWithCode?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type SignupMutationVariables = Exact<{
  input?: InputMaybe<SignupInputType>;
}>;


export type SignupMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  input?: InputMaybe<ForgotPasswordInputType>;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: boolean | null };

export type ResetPasswordMutationVariables = Exact<{
  input?: InputMaybe<ResetPasswordInputType>;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: boolean | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type BuyWordInfoFragment = { __typename?: 'BuyWord', id?: string | null, price?: number | null, numberWord?: number | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null };

export type ListBuyWordAdminQueryVariables = Exact<{
  input?: InputMaybe<ListBuyWordAdminInputType>;
}>;


export type ListBuyWordAdminQuery = { __typename?: 'Query', listBuyWordAdmin?: { __typename?: 'BuyWordsResponseData', data?: Array<{ __typename?: 'BuyWord', id?: string | null, price?: number | null, numberWord?: number | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type RequestBuyWordMutationVariables = Exact<{
  input?: InputMaybe<RequestBuyWordInputType>;
}>;


export type RequestBuyWordMutation = { __typename?: 'Mutation', requestBuyWord?: { __typename?: 'BuyWord', id?: string | null, price?: number | null, numberWord?: number | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null };

export type ConfirmRequestBuyWordMutationVariables = Exact<{
  input?: InputMaybe<ConfirmRequestBuyWordInputType>;
}>;


export type ConfirmRequestBuyWordMutation = { __typename?: 'Mutation', confirmRequestBuyWord?: boolean | null };

export type PageChannelInfoFragment = { __typename?: 'PageChannel', id?: string | null, name?: string | null, isActive?: boolean | null, pageChannelId?: string | null, url?: string | null, username?: string | null, password?: string | null, type?: ChannelType | null, createdAt?: any | null };

export type PageChannelsQueryVariables = Exact<{
  input?: InputMaybe<PageChannelsInputType>;
}>;


export type PageChannelsQuery = { __typename?: 'Query', pageChannels?: { __typename?: 'PageChannelsResponseData', data?: Array<{ __typename?: 'PageChannel', id?: string | null, name?: string | null, isActive?: boolean | null, pageChannelId?: string | null, url?: string | null, username?: string | null, password?: string | null, type?: ChannelType | null, createdAt?: any | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ConnectFacebookPageMutationVariables = Exact<{ [key: string]: never; }>;


export type ConnectFacebookPageMutation = { __typename?: 'Mutation', connectFacebookPage?: boolean | null };

export type SyncContentPageChannelMutationVariables = Exact<{
  input?: InputMaybe<SyncContentPageChannelInputType>;
}>;


export type SyncContentPageChannelMutation = { __typename?: 'Mutation', syncContentPageChannel?: boolean | null };

export type UpdatePageChannelMutationVariables = Exact<{
  input?: InputMaybe<UpdatePageChannelInputType>;
}>;


export type UpdatePageChannelMutation = { __typename?: 'Mutation', updatePageChannel?: { __typename?: 'PageChannel', id?: string | null, name?: string | null, isActive?: boolean | null, pageChannelId?: string | null, url?: string | null, username?: string | null, password?: string | null, type?: ChannelType | null, createdAt?: any | null } | null };

export type DeletePageChannelMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DeletePageChannelMutation = { __typename?: 'Mutation', deletePageChannel?: boolean | null };

export type ConversationInfoFragment = { __typename?: 'Conversation', id?: string | null, title?: string | null, docId?: string | null, type?: ConversationType | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, doc?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null };

export type ConversationItemInfoFragment = { __typename?: 'ConversationItem', id?: string | null, message?: string | null, createdById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null };

export type ConversationsQueryVariables = Exact<{
  input?: InputMaybe<ConversationsInputType>;
}>;


export type ConversationsQuery = { __typename?: 'Query', conversations?: { __typename?: 'ConversationsRepsonse', data?: Array<{ __typename?: 'Conversation', id?: string | null, title?: string | null, docId?: string | null, type?: ConversationType | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, doc?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ConversationQueryVariables = Exact<{
  conversationId?: InputMaybe<Scalars['ID']>;
}>;


export type ConversationQuery = { __typename?: 'Query', conversation?: { __typename?: 'Conversation', id?: string | null, title?: string | null, docId?: string | null, type?: ConversationType | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, doc?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null } | null };

export type AddConversationMutationVariables = Exact<{
  input?: InputMaybe<AddConversationInputType>;
}>;


export type AddConversationMutation = { __typename?: 'Mutation', addConversation?: { __typename?: 'Conversation', id?: string | null, title?: string | null, docId?: string | null, type?: ConversationType | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, doc?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null } | null };

export type UpdateConversationMutationVariables = Exact<{
  input?: InputMaybe<UpdateConversationInputType>;
}>;


export type UpdateConversationMutation = { __typename?: 'Mutation', updateConversation?: { __typename?: 'Conversation', id?: string | null, title?: string | null, docId?: string | null, type?: ConversationType | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, doc?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null } | null };

export type ListMessageConversationQueryVariables = Exact<{
  input?: InputMaybe<ListMessageConversationInputType>;
}>;


export type ListMessageConversationQuery = { __typename?: 'Query', listMessageConversation?: { __typename?: 'ListMessageConversationResponse', data?: Array<{ __typename?: 'ConversationItem', id?: string | null, message?: string | null, createdById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type DeleteConversationMutationVariables = Exact<{
  conversationId?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteConversationMutation = { __typename?: 'Mutation', deleteConversation?: boolean | null };

export type AddMessageInConversationMutationVariables = Exact<{
  input?: InputMaybe<ConversationItemInputType>;
}>;


export type AddMessageInConversationMutation = { __typename?: 'Mutation', addMessageInConversation?: { __typename?: 'ConversationItem', id?: string | null, message?: string | null, createdById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null };

export type DeleteMessageInConversationMutationVariables = Exact<{
  messageId: Scalars['ID'];
}>;


export type DeleteMessageInConversationMutation = { __typename?: 'Mutation', deleteMessageInConversation?: boolean | null };

export type ConversationDefaultQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']>;
}>;


export type ConversationDefaultQuery = { __typename?: 'Query', conversationDefault?: { __typename?: 'Conversation', id?: string | null, title?: string | null, docId?: string | null, type?: ConversationType | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, doc?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null } | null };

export type GetTotalTokenDocMutationVariables = Exact<{
  url?: InputMaybe<Scalars['String']>;
}>;


export type GetTotalTokenDocMutation = { __typename?: 'Mutation', getTotalTokenDoc?: { __typename?: 'GetTotalTokenDocResponseData', totalToken?: number | null, totalPrice?: number | null } | null };

export type EmbeddedDocumentMutationVariables = Exact<{
  documentId: Scalars['ID'];
}>;


export type EmbeddedDocumentMutation = { __typename?: 'Mutation', embeddedDocument?: boolean | null };

export type ReSearchDocumentMutationVariables = Exact<{
  input?: InputMaybe<ReSearchDocumentInputType>;
}>;


export type ReSearchDocumentMutation = { __typename?: 'Mutation', reSearchDocument?: string | null };

export type CodeInfoFragment = { __typename?: 'Code', id?: string | null, code?: string | null, email?: string | null, createdAt?: any | null, isExpired?: boolean | null };

export type CodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type CodeQuery = { __typename?: 'Query', code?: { __typename?: 'Code', id?: string | null, code?: string | null, email?: string | null, createdAt?: any | null, isExpired?: boolean | null } | null };

export type ContentInfoFragment = { __typename?: 'Content', id?: string | null, title?: string | null, content?: string | null, link?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, service?: { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null };

export type ContentsQueryVariables = Exact<{
  input?: InputMaybe<ContentsInputType>;
}>;


export type ContentsQuery = { __typename?: 'Query', contents?: { __typename?: 'ContentsResponseType', data?: Array<{ __typename?: 'Content', id?: string | null, title?: string | null, content?: string | null, link?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, service?: { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ContentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ContentQuery = { __typename?: 'Query', content?: { __typename?: 'Content', id?: string | null, title?: string | null, content?: string | null, link?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, service?: { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null } | null };

export type UpdateContentMutationVariables = Exact<{
  input?: InputMaybe<UpdateContentInputType>;
}>;


export type UpdateContentMutation = { __typename?: 'Mutation', updateContent?: { __typename?: 'Content', id?: string | null, title?: string | null, content?: string | null, link?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, service?: { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null } | null };

export type DeleteContentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteContentMutation = { __typename?: 'Mutation', deleteContent?: boolean | null };

export type CustomFieldInfoFragment = { __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null };

export type CustomFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomFieldsQuery = { __typename?: 'Query', customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null };

export type AddCustomFieldMutationVariables = Exact<{
  input?: InputMaybe<AddCustomFieldInputType>;
}>;


export type AddCustomFieldMutation = { __typename?: 'Mutation', addCustomField?: { __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null };

export type DeleteCustomFieldMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCustomFieldMutation = { __typename?: 'Mutation', deleteCustomField?: boolean | null };

export type DocumentInfoFragment = { __typename?: 'Document', id?: string | null, title?: string | null, content?: string | null, outline?: string | null, userId?: string | null, projectId?: string | null, slug?: string | null, url?: string | null, description?: string | null, keywordId?: string | null, draftId?: string | null, hasDraft?: boolean | null, parentId?: string | null, createdAt?: any | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, url?: string | null, description?: string | null } | null, keyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null };

export type DocumentsQueryVariables = Exact<{
  input?: InputMaybe<DocumentsInputType>;
}>;


export type DocumentsQuery = { __typename?: 'Query', documents?: { __typename?: 'DocumentsResponseType', data?: Array<{ __typename?: 'Document', id?: string | null, title?: string | null, content?: string | null, outline?: string | null, userId?: string | null, projectId?: string | null, slug?: string | null, url?: string | null, description?: string | null, keywordId?: string | null, draftId?: string | null, hasDraft?: boolean | null, parentId?: string | null, createdAt?: any | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, url?: string | null, description?: string | null } | null, keyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type DocumentQueryVariables = Exact<{
  id: Scalars['String'];
  isDraft?: InputMaybe<Scalars['Boolean']>;
}>;


export type DocumentQuery = { __typename?: 'Query', document?: { __typename?: 'Document', id?: string | null, title?: string | null, content?: string | null, outline?: string | null, userId?: string | null, projectId?: string | null, slug?: string | null, url?: string | null, description?: string | null, keywordId?: string | null, draftId?: string | null, hasDraft?: boolean | null, parentId?: string | null, createdAt?: any | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, url?: string | null, description?: string | null } | null, keyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null };

export type CreateDocumentMutationVariables = Exact<{
  input?: InputMaybe<DocumentDataInputType>;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument?: { __typename?: 'Document', id?: string | null, title?: string | null, content?: string | null, outline?: string | null, userId?: string | null, projectId?: string | null, slug?: string | null, url?: string | null, description?: string | null, keywordId?: string | null, draftId?: string | null, hasDraft?: boolean | null, parentId?: string | null, createdAt?: any | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, url?: string | null, description?: string | null } | null, keyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null };

export type SaveDraftDocumentMutationVariables = Exact<{
  input?: InputMaybe<UpdateDocumentInputType>;
}>;


export type SaveDraftDocumentMutation = { __typename?: 'Mutation', saveDraftDocument?: { __typename?: 'Document', id?: string | null, title?: string | null, content?: string | null, outline?: string | null, userId?: string | null, projectId?: string | null, slug?: string | null, url?: string | null, description?: string | null, keywordId?: string | null, draftId?: string | null, hasDraft?: boolean | null, parentId?: string | null, createdAt?: any | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, url?: string | null, description?: string | null } | null, keyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null };

export type UpdateDocumentMutationVariables = Exact<{
  input?: InputMaybe<UpdateDocumentInputType>;
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocument?: { __typename?: 'Document', id?: string | null, title?: string | null, content?: string | null, outline?: string | null, userId?: string | null, projectId?: string | null, slug?: string | null, url?: string | null, description?: string | null, keywordId?: string | null, draftId?: string | null, hasDraft?: boolean | null, parentId?: string | null, createdAt?: any | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, url?: string | null, description?: string | null } | null, keyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null } | null };

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument?: boolean | null };

export type EmailSignupInfoFragment = { __typename?: 'EmailSignup', email?: string | null };

export type GetEmailSignupQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetEmailSignupQuery = { __typename?: 'Query', getEmailSignup?: { __typename?: 'EmailSignup', email?: string | null } | null };

export type ImageInfoFragment = { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null };

export type FolderImageInfoFragment = { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null };

export type ImagesQueryVariables = Exact<{
  input?: InputMaybe<ImagesInputType>;
}>;


export type ImagesQuery = { __typename?: 'Query', images?: { __typename?: 'ImagesResponse', data?: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ImageQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type ImageQuery = { __typename?: 'Query', image?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null };

export type FolderImagesQueryVariables = Exact<{
  input?: InputMaybe<FolderImagesInputType>;
}>;


export type FolderImagesQuery = { __typename?: 'Query', folderImages?: { __typename?: 'FolderImagesResponse', data?: Array<{ __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type FolderImageQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type FolderImageQuery = { __typename?: 'Query', folderImage?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null };

export type UpdateImageMutationVariables = Exact<{
  input?: InputMaybe<UpdateImageInputType>;
}>;


export type UpdateImageMutation = { __typename?: 'Mutation', updateImage?: { __typename?: 'Image', id?: string | null, url?: string | null, src?: string | null, name?: string | null, description?: string | null, type?: TypeFile | null, isEmbedded?: boolean | null, createdAt?: any | null, folder?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null } | null };

export type DeleteImageMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type DeleteImageMutation = { __typename?: 'Mutation', deleteImage?: boolean | null };

export type AddFolderImageMutationVariables = Exact<{
  input?: InputMaybe<AddFolderImageInputType>;
}>;


export type AddFolderImageMutation = { __typename?: 'Mutation', addFolderImage?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null };

export type DeleteFolderImageMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteFolderImageMutation = { __typename?: 'Mutation', deleteFolderImage?: boolean | null };

export type UpdateFolderImageMutationVariables = Exact<{
  input?: InputMaybe<UpdateFolderImageInputType>;
}>;


export type UpdateFolderImageMutation = { __typename?: 'Mutation', updateFolderImage?: { __typename?: 'FolderImage', id?: string | null, name?: string | null, slug?: string | null, type?: TypeFile | null, description?: string | null, totalImage?: number | null, createdAt?: any | null } | null };

export type GenerateImageWithReplicateMutationVariables = Exact<{
  prompt?: InputMaybe<Scalars['String']>;
}>;


export type GenerateImageWithReplicateMutation = { __typename?: 'Mutation', generateImageWithReplicate?: string | null };

export type SubKeywordInfoFragment = { __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null };

export type ParentKeywordInfoFragment = { __typename?: 'Keyword', id?: string | null, value?: string | null };

export type KeywordInfoFragment = { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null };

export type KeywordsQueryVariables = Exact<{
  input?: InputMaybe<KeywordsInputType>;
}>;


export type KeywordsQuery = { __typename?: 'Query', keywords?: { __typename?: 'KeywordsResponse', data?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type SubKeywordsQueryVariables = Exact<{
  input?: InputMaybe<SubKeywordsInputType>;
}>;


export type SubKeywordsQuery = { __typename?: 'Query', subKeywords?: { __typename?: 'KeywordsResponse', data?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type KeywordQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type KeywordQuery = { __typename?: 'Query', keyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null };

export type AddKeywordMutationVariables = Exact<{
  input?: InputMaybe<KeywordDataInputType>;
}>;


export type AddKeywordMutation = { __typename?: 'Mutation', addKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null };

export type UpdateKeywordMutationVariables = Exact<{
  input?: InputMaybe<UpdateKeywordInputType>;
}>;


export type UpdateKeywordMutation = { __typename?: 'Mutation', updateKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null, projectId?: string | null, description?: string | null, createdAt?: any | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null, subKeywords?: Array<{ __typename?: 'Keyword', id?: string | null, value?: string | null } | null> | null } | null> | null, parentKeyword?: { __typename?: 'Keyword', id?: string | null, value?: string | null } | null } | null };

export type DeleteKeywordMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteKeywordMutation = { __typename?: 'Mutation', deleteKeyword?: boolean | null };

export type LanguageInfoFragment = { __typename?: 'Language', id?: string | null, label?: string | null, value?: string | null, isDefault?: boolean | null, createdAt?: any | null };

export type LanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type LanguagesQuery = { __typename?: 'Query', languages?: Array<{ __typename?: 'Language', id?: string | null, label?: string | null, value?: string | null, isDefault?: boolean | null, createdAt?: any | null } | null> | null };

export type UpdateLanguageMutationVariables = Exact<{
  input?: InputMaybe<UpdateLanguageInputType>;
}>;


export type UpdateLanguageMutation = { __typename?: 'Mutation', updateLanguage?: { __typename?: 'Language', id?: string | null, label?: string | null, value?: string | null, isDefault?: boolean | null, createdAt?: any | null } | null };

export type DeleteLanguageMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLanguageMutation = { __typename?: 'Mutation', deleteLanguage?: boolean | null };

export type PackageInfoFragment = { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null, isActive?: boolean | null, isShow?: boolean | null, createdAt?: any | null, packageItems?: Array<{ __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null> | null };

export type PackageItemInfoFragment = { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null };

export type PackagePeriodInfoFragment = { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null };

export type PackagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PackagesQuery = { __typename?: 'Query', packages?: Array<{ __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null, isActive?: boolean | null, isShow?: boolean | null, createdAt?: any | null, packageItems?: Array<{ __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null> | null } | null> | null };

export type PackagePeriodsQueryVariables = Exact<{ [key: string]: never; }>;


export type PackagePeriodsQuery = { __typename?: 'Query', packagePeriods?: Array<{ __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null> | null };

export type PricingQueryVariables = Exact<{ [key: string]: never; }>;


export type PricingQuery = { __typename?: 'Query', pricing?: { __typename?: 'PricingResponse', packages?: Array<{ __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null, isActive?: boolean | null, isShow?: boolean | null, createdAt?: any | null, packageItems?: Array<{ __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null> | null } | null> | null } | null };

export type UpdatePackageMutationVariables = Exact<{
  input?: InputMaybe<UpdatePackageInputType>;
}>;


export type UpdatePackageMutation = { __typename?: 'Mutation', updatePackage?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null, isActive?: boolean | null, isShow?: boolean | null, createdAt?: any | null, packageItems?: Array<{ __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null> | null } | null };

export type UpdatePackagePeriodMutationVariables = Exact<{
  input?: InputMaybe<UpdatePackagePeriodInputType>;
}>;


export type UpdatePackagePeriodMutation = { __typename?: 'Mutation', updatePackagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null };

export type UpdatePackageItemMutationVariables = Exact<{
  input?: InputMaybe<UpdatePackageItemInputType>;
}>;


export type UpdatePackageItemMutation = { __typename?: 'Mutation', updatePackageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null };

export type PaymentHistoryInfoFragment = { __typename?: 'PaymentHistory', id?: string | null, amount?: number | null, transactionType?: TransactionType | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdById?: string | null, confirmAt?: string | null, confirmById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, cancelBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null };

export type CreatePaymentHistoryMutationVariables = Exact<{
  input?: InputMaybe<CreatePaymentHistoryInputType>;
}>;


export type CreatePaymentHistoryMutation = { __typename?: 'Mutation', createPaymentHistory?: boolean | null };

export type PaymentHistoriesUserQueryVariables = Exact<{
  input?: InputMaybe<PaymentHistoriesInputType>;
}>;


export type PaymentHistoriesUserQuery = { __typename?: 'Query', paymentHistoriesUser?: { __typename?: 'PaymentHistoriesResponse', data?: Array<{ __typename?: 'PaymentHistory', id?: string | null, amount?: number | null, transactionType?: TransactionType | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdById?: string | null, confirmAt?: string | null, confirmById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, cancelBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type PaymentHistoriesAdminQueryVariables = Exact<{
  input?: InputMaybe<PaymentHistoriesAdminInputType>;
}>;


export type PaymentHistoriesAdminQuery = { __typename?: 'Query', paymentHistoriesAdmin?: { __typename?: 'PaymentHistoriesResponse', data?: Array<{ __typename?: 'PaymentHistory', id?: string | null, amount?: number | null, transactionType?: TransactionType | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdById?: string | null, confirmAt?: string | null, confirmById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, cancelBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ConfirmPaymentHistoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ConfirmPaymentHistoryMutation = { __typename?: 'Mutation', confirmPaymentHistory?: { __typename?: 'PaymentHistory', id?: string | null, amount?: number | null, transactionType?: TransactionType | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdById?: string | null, confirmAt?: string | null, confirmById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, cancelBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null };

export type CancelPaymentHistoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CancelPaymentHistoryMutation = { __typename?: 'Mutation', cancelPaymentHistory?: { __typename?: 'PaymentHistory', id?: string | null, amount?: number | null, transactionType?: TransactionType | null, isConfirm?: boolean | null, isCancel?: boolean | null, createdById?: string | null, confirmAt?: string | null, confirmById?: string | null, createdAt?: any | null, createdBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, confirmBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, cancelBy?: { __typename?: 'User', id: string, fullname?: string | null } | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null };

export type DeletePaymentHistoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePaymentHistoryMutation = { __typename?: 'Mutation', deletePaymentHistory?: boolean | null };

export type PexelsInfoFragment = { __typename?: 'Pexels', id?: number | null, avg_color?: string | null, alt?: string | null, src?: string | null };

export type PexelsPhotosQueryVariables = Exact<{
  input?: InputMaybe<PexelsPhotosInputType>;
}>;


export type PexelsPhotosQuery = { __typename?: 'Query', pexelsPhotos?: { __typename?: 'PexelsPhotosResponseData', data?: Array<{ __typename?: 'Pexels', id?: number | null, avg_color?: string | null, alt?: string | null, src?: string | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ProjectInfoFragment = { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null };

export type ProjectsQueryVariables = Exact<{
  input?: InputMaybe<ProjectsInputType>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectsResponseType', data?: Array<{ __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type ProjectDefaultQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectDefaultQuery = { __typename?: 'Query', projectDefault?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type AddProjectMutationVariables = Exact<{
  input?: InputMaybe<ProjectDataInputType>;
}>;


export type AddProjectMutation = { __typename?: 'Mutation', addProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  input?: InputMaybe<UpdateProjectInputType>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type ChangeDefaultProjectMutationVariables = Exact<{
  input?: InputMaybe<ChangeDefaultProjectInputType>;
}>;


export type ChangeDefaultProjectMutation = { __typename?: 'Mutation', changeDefaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: boolean | null };

export type ChangeDefaultProjectUserMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ChangeDefaultProjectUserMutation = { __typename?: 'Mutation', changeDefaultProjectUser?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type RequestHistoryInfoFragment = { __typename?: 'RequestHistory', id?: string | null, tokens?: number | null, price?: number | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, fullname?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, description?: string | null, balance?: number | null, bucket?: string | null, isOwner?: boolean | null, expiredAt?: any | null, isTrial?: boolean | null, timeTrial?: number | null, createdAt?: any | null, owner?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type RequestHistoriesQueryVariables = Exact<{
  input?: InputMaybe<RequestHistoriesInputType>;
}>;


export type RequestHistoriesQuery = { __typename?: 'Query', requestHistories?: { __typename?: 'RequestHistoriesResponseData', data?: Array<{ __typename?: 'RequestHistory', id?: string | null, tokens?: number | null, price?: number | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, fullname?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, description?: string | null, balance?: number | null, bucket?: string | null, isOwner?: boolean | null, expiredAt?: any | null, isTrial?: boolean | null, timeTrial?: number | null, createdAt?: any | null, owner?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, project?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ServiceCategoryInfoFragment = { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null, description?: string | null, order?: number | null, createdAt?: any | null, services?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null };

export type ServiceCategoriesQueryVariables = Exact<{
  input?: InputMaybe<ServiceCategoriesInputType>;
}>;


export type ServiceCategoriesQuery = { __typename?: 'Query', serviceCategories?: { __typename?: 'ServiceCategoriesResponseType', data?: Array<{ __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null, description?: string | null, order?: number | null, createdAt?: any | null, services?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ServiceCategoriesCustomerQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;


export type ServiceCategoriesCustomerQuery = { __typename?: 'Query', serviceCategoriesCustomer?: Array<{ __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null, description?: string | null, order?: number | null, createdAt?: any | null, services?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null } | null> | null };

export type ServiceCategoryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ServiceCategoryQuery = { __typename?: 'Query', serviceCategory?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null, description?: string | null, order?: number | null, createdAt?: any | null, services?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null } | null };

export type AddServiceCategoryMutationVariables = Exact<{
  input?: InputMaybe<AddServiceCategoryInputType>;
}>;


export type AddServiceCategoryMutation = { __typename?: 'Mutation', addServiceCategory?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null, description?: string | null, order?: number | null, createdAt?: any | null, services?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null } | null };

export type UpdateServiceCategoryMutationVariables = Exact<{
  input?: InputMaybe<UpdateServiceCategoryInputType>;
}>;


export type UpdateServiceCategoryMutation = { __typename?: 'Mutation', updateServiceCategory?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null, description?: string | null, order?: number | null, createdAt?: any | null, services?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null } | null };

export type DeleteServiceCategoryMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteServiceCategoryMutation = { __typename?: 'Mutation', deleteServiceCategory?: boolean | null };

export type ServiceInfoFragment = { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null };

export type ServiceDashboardInfoFragment = { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, isDelete?: boolean | null, leadingSentence?: string | null, leadingLanguage?: string | null, leadingStyleContent?: string | null, systemMessage?: string | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null };

export type ServicesQueryVariables = Exact<{
  input?: InputMaybe<ServicesInputType>;
}>;


export type ServicesQuery = { __typename?: 'Query', services?: { __typename?: 'ServicesResponseType', data?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ServicesDashboardQueryVariables = Exact<{
  input?: InputMaybe<ServicesInputType>;
}>;


export type ServicesDashboardQuery = { __typename?: 'Query', servicesDashboard?: { __typename?: 'ServicesResponseType', data?: Array<{ __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, isDelete?: boolean | null, leadingSentence?: string | null, leadingLanguage?: string | null, leadingStyleContent?: string | null, systemMessage?: string | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type ServiceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ServiceQuery = { __typename?: 'Query', service?: { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null };

export type AddServiceMutationVariables = Exact<{
  input?: InputMaybe<DataServiceInputType>;
}>;


export type AddServiceMutation = { __typename?: 'Mutation', addService?: { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null };

export type UpdateServiceMutationVariables = Exact<{
  input?: InputMaybe<UpdateServiceInputType>;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService?: { __typename?: 'Service', id?: string | null, title?: string | null, slug?: string | null, categoryId?: string | null, model?: ModelAi | null, description?: string | null, createdAt?: any | null, category?: { __typename?: 'ServiceCategory', id?: string | null, title?: string | null, slug?: string | null } | null, customFields?: Array<{ __typename?: 'CustomField', id?: string | null, title?: string | null, field?: string | null, description?: string | null, active?: boolean | null, inputType?: CustomFieldInputType | null, createdAt?: any | null } | null> | null } | null };

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService?: boolean | null };

export type SettingInfoFragment = { __typename?: 'Setting', id?: string | null, priceToken?: number | null, documentLink?: string | null, numberOfTimeUseGpt4?: number | null, timeTrial?: number | null, bonusBalanceSignup?: number | null, fieldTitle?: string | null, fieldDescription?: string | null, fieldMainKeyword?: string | null, fieldSubKeyword?: string | null, fieldParagraph?: string | null, fieldLanguage?: string | null, fieldStyleContent?: string | null };

export type SettingQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingQuery = { __typename?: 'Query', setting?: { __typename?: 'Setting', id?: string | null, priceToken?: number | null, documentLink?: string | null, numberOfTimeUseGpt4?: number | null, timeTrial?: number | null, bonusBalanceSignup?: number | null, fieldTitle?: string | null, fieldDescription?: string | null, fieldMainKeyword?: string | null, fieldSubKeyword?: string | null, fieldParagraph?: string | null, fieldLanguage?: string | null, fieldStyleContent?: string | null } | null };

export type UpdateSettingMutationVariables = Exact<{
  input?: InputMaybe<UpdateSettingInputType>;
}>;


export type UpdateSettingMutation = { __typename?: 'Mutation', updateSetting?: { __typename?: 'Setting', id?: string | null, priceToken?: number | null, documentLink?: string | null, numberOfTimeUseGpt4?: number | null, timeTrial?: number | null, bonusBalanceSignup?: number | null, fieldTitle?: string | null, fieldDescription?: string | null, fieldMainKeyword?: string | null, fieldSubKeyword?: string | null, fieldParagraph?: string | null, fieldLanguage?: string | null, fieldStyleContent?: string | null } | null };

export type CreatedByInfoFragment = { __typename?: 'User', id: string, fullname?: string | null };

export type PaginationInfoFragment = { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null };

export type StyleContentInfoFragment = { __typename?: 'StyleContent', id?: string | null, label?: string | null, value?: string | null, createdAt?: any | null };

export type StyleContentsQueryVariables = Exact<{ [key: string]: never; }>;


export type StyleContentsQuery = { __typename?: 'Query', styleContents?: Array<{ __typename?: 'StyleContent', id?: string | null, label?: string | null, value?: string | null, createdAt?: any | null } | null> | null };

export type UpdateStyleContentMutationVariables = Exact<{
  input?: InputMaybe<UpdateStyleContentInputType>;
}>;


export type UpdateStyleContentMutation = { __typename?: 'Mutation', updateStyleContent?: { __typename?: 'StyleContent', id?: string | null, label?: string | null, value?: string | null, createdAt?: any | null } | null };

export type DeleteStyleContentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteStyleContentMutation = { __typename?: 'Mutation', deleteStyleContent?: boolean | null };

export type MemberInfoFragment = { __typename?: 'User', id: string, fullname?: string | null, email: string, role?: UserRole | null, createdAt?: any | null };

export type TeamInfoFragment = { __typename?: 'Team', id?: string | null, name?: string | null, ownerId?: string | null, default?: boolean | null, createdAt?: any | null, members?: Array<{ __typename?: 'User', id: string, fullname?: string | null, email: string, role?: UserRole | null, createdAt?: any | null } | null> | null };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id?: string | null, name?: string | null, ownerId?: string | null, default?: boolean | null, createdAt?: any | null, members?: Array<{ __typename?: 'User', id: string, fullname?: string | null, email: string, role?: UserRole | null, createdAt?: any | null } | null> | null } | null> | null };

export type TeamQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TeamQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id?: string | null, name?: string | null, ownerId?: string | null, default?: boolean | null, createdAt?: any | null, members?: Array<{ __typename?: 'User', id: string, fullname?: string | null, email: string, role?: UserRole | null, createdAt?: any | null } | null> | null } | null };

export type TeamDefaultQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamDefaultQuery = { __typename?: 'Query', teamDefault?: { __typename?: 'Team', id?: string | null, name?: string | null, ownerId?: string | null, default?: boolean | null, createdAt?: any | null, members?: Array<{ __typename?: 'User', id: string, fullname?: string | null, email: string, role?: UserRole | null, createdAt?: any | null } | null> | null } | null };

export type AddTeamMutationVariables = Exact<{
  input?: InputMaybe<DataTeamInputType>;
}>;


export type AddTeamMutation = { __typename?: 'Mutation', addTeam?: { __typename?: 'Team', id?: string | null, name?: string | null, ownerId?: string | null, default?: boolean | null, createdAt?: any | null, members?: Array<{ __typename?: 'User', id: string, fullname?: string | null, email: string, role?: UserRole | null, createdAt?: any | null } | null> | null } | null };

export type UpdateTeamMutationVariables = Exact<{
  input?: InputMaybe<UpdateTeamInputType>;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam?: { __typename?: 'Team', id?: string | null, name?: string | null, ownerId?: string | null, default?: boolean | null, createdAt?: any | null, members?: Array<{ __typename?: 'User', id: string, fullname?: string | null, email: string, role?: UserRole | null, createdAt?: any | null } | null> | null } | null };

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam?: boolean | null };

export type ChangeDefaultTeamMutationVariables = Exact<{
  teamId?: InputMaybe<Scalars['ID']>;
}>;


export type ChangeDefaultTeamMutation = { __typename?: 'Mutation', changeDefaultTeam?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type UserInfoFragment = { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null };

export type UsersQueryVariables = Exact<{
  input?: InputMaybe<UsersInputType>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: { __typename?: 'UsersDataResponse', data?: Array<{ __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null> | null, pagination?: { __typename?: 'PaginationType', total?: number | null, page?: number | null, perPage?: number | null } | null } | null };

export type AddCustomerMutationVariables = Exact<{
  input?: InputMaybe<AddCustomerInputType>;
}>;


export type AddCustomerMutation = { __typename?: 'Mutation', addCustomer?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type AddMemberMutationVariables = Exact<{
  input?: InputMaybe<AddMemberInputType>;
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type DeleteMemberMutationVariables = Exact<{
  memberId: Scalars['ID'];
}>;


export type DeleteMemberMutation = { __typename?: 'Mutation', deleteMember?: boolean | null };

export type UpdateUserMutationVariables = Exact<{
  input?: InputMaybe<UpdateUserInputType>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null };

export type ChangeEmailMutationVariables = Exact<{
  input?: InputMaybe<ChangeEmailUserInputType>;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail?: boolean | null };

export type ChangePasswordMutationVariables = Exact<{
  input?: InputMaybe<ChangePasswordUserInputType>;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: boolean | null };

export type WorkspaceInfoFragment = { __typename?: 'Workspace', id?: string | null, name?: string | null, description?: string | null, balance?: number | null, bucket?: string | null, isOwner?: boolean | null, expiredAt?: any | null, isTrial?: boolean | null, timeTrial?: number | null, createdAt?: any | null, owner?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null };

export type WorkspacePackageInfoFragment = { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null };

export type WorkspaceQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type WorkspaceQuery = { __typename?: 'Query', workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, description?: string | null, balance?: number | null, bucket?: string | null, isOwner?: boolean | null, expiredAt?: any | null, isTrial?: boolean | null, timeTrial?: number | null, createdAt?: any | null, owner?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null };

export type UpdateWorkspaceMutationVariables = Exact<{
  input?: InputMaybe<UpdateWorkspaceInputType>;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', updateWorkspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, description?: string | null, balance?: number | null, bucket?: string | null, isOwner?: boolean | null, expiredAt?: any | null, isTrial?: boolean | null, timeTrial?: number | null, createdAt?: any | null, owner?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null };

export type UpdateWorkspaceAdminMutationVariables = Exact<{
  input?: InputMaybe<UpdateWorkspaceAdminInputType>;
}>;


export type UpdateWorkspaceAdminMutation = { __typename?: 'Mutation', updateWorkspaceAdmin?: { __typename?: 'Workspace', id?: string | null, name?: string | null, description?: string | null, balance?: number | null, bucket?: string | null, isOwner?: boolean | null, expiredAt?: any | null, isTrial?: boolean | null, timeTrial?: number | null, createdAt?: any | null, owner?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null };

export type PayRequestAiContentMutationVariables = Exact<{
  token?: InputMaybe<Scalars['Int']>;
  content?: InputMaybe<Scalars['String']>;
}>;


export type PayRequestAiContentMutation = { __typename?: 'Mutation', payRequestAiContent?: number | null };

export type ChangeExpiredTimeWorkspaceMutationVariables = Exact<{
  input?: InputMaybe<ChangeExpiredTimeWorkspaceInputType>;
}>;


export type ChangeExpiredTimeWorkspaceMutation = { __typename?: 'Mutation', changeExpiredTimeWorkspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, description?: string | null, balance?: number | null, bucket?: string | null, isOwner?: boolean | null, expiredAt?: any | null, isTrial?: boolean | null, timeTrial?: number | null, createdAt?: any | null, owner?: { __typename?: 'User', id: string, email: string, username: string, fullname?: string | null, phoneNumber?: string | null, active?: boolean | null, isVerify?: boolean | null, role?: UserRole | null, workspaceId?: string | null, isDeveloper?: boolean | null, defaultTeamId?: string | null, defaultProjectId?: string | null, createdAt?: any | null, workspace?: { __typename?: 'Workspace', id?: string | null, name?: string | null, bucket?: string | null, bucketSize?: number | null, description?: string | null, balance?: number | null, isOwner?: boolean | null, isTrial?: boolean | null, timeTrial?: number | null, expiredAt?: any | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null, defaultProject?: { __typename?: 'Project', id?: string | null, name?: string | null, teamId?: string | null, default?: boolean | null, url?: string | null, description?: string | null, createdAt?: any | null } | null } | null, workspacePackage?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null } | null };

export type PayContentAiMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']>;
}>;


export type PayContentAiMutation = { __typename?: 'Mutation', payContentAI?: boolean | null };

export type UpdateTimeUseGpt4MutationVariables = Exact<{
  workspacePackageId: Scalars['ID'];
}>;


export type UpdateTimeUseGpt4Mutation = { __typename?: 'Mutation', updateTimeUseGpt4?: { __typename?: 'WorkspacePackage', id?: string | null, packageItemId?: string | null, isActive?: boolean | null, startDateWord?: any | null, numberWord?: number | null, timeUseGpt4?: number | null, time?: number | null, freeTime?: number | null, createdAt?: any | null, packageItem?: { __typename?: 'PackageItem', id?: string | null, price?: number | null, freeTime?: number | null, isActive?: boolean | null, packageParentId?: string | null, packagePeriodId?: string | null, content?: string | null, numberWord?: number | null, createdAt?: any | null, packageParent?: { __typename?: 'Package', id?: string | null, name?: string | null, type?: PackageType | null } | null, packagePeriod?: { __typename?: 'PackagePeriod', id?: string | null, name?: string | null, time?: number | null, order?: number | null, isActive?: boolean | null, createdAt?: any | null } | null } | null } | null };

export const AiSettingAppInfoFragmentDoc = `
    fragment AiSettingAppInfo on AiSettingApp {
  id
  type
  leadingSentence
  max_tokens
}
    `;
export const CreatedByInfoFragmentDoc = `
    fragment CreatedByInfo on User {
  id
  fullname
}
    `;
export const BuyWordInfoFragmentDoc = `
    fragment BuyWordInfo on BuyWord {
  id
  workspace {
    id
    name
  }
  createdBy {
    ...CreatedByInfo
  }
  confirmBy {
    ...CreatedByInfo
  }
  price
  numberWord
  isConfirm
  isCancel
  createdAt
}
    ${CreatedByInfoFragmentDoc}`;
export const PageChannelInfoFragmentDoc = `
    fragment PageChannelInfo on PageChannel {
  id
  name
  isActive
  pageChannelId
  url
  username
  password
  type
  createdAt
}
    `;
export const FolderImageInfoFragmentDoc = `
    fragment FolderImageInfo on FolderImage {
  id
  name
  slug
  type
  description
  totalImage
  createdAt
}
    `;
export const ImageInfoFragmentDoc = `
    fragment ImageInfo on Image {
  id
  url
  src
  name
  description
  type
  isEmbedded
  folder {
    ...FolderImageInfo
  }
  createdAt
}
    ${FolderImageInfoFragmentDoc}`;
export const ConversationInfoFragmentDoc = `
    fragment ConversationInfo on Conversation {
  id
  title
  createdBy {
    ...CreatedByInfo
  }
  doc {
    ...ImageInfo
  }
  docId
  type
  createdAt
}
    ${CreatedByInfoFragmentDoc}
${ImageInfoFragmentDoc}`;
export const ConversationItemInfoFragmentDoc = `
    fragment ConversationItemInfo on ConversationItem {
  id
  message
  createdById
  createdBy {
    ...CreatedByInfo
  }
  createdAt
}
    ${CreatedByInfoFragmentDoc}`;
export const CodeInfoFragmentDoc = `
    fragment CodeInfo on Code {
  id
  code
  email
  createdAt
  isExpired
}
    `;
export const CustomFieldInfoFragmentDoc = `
    fragment CustomFieldInfo on CustomField {
  id
  title
  field
  description
  active
  inputType
  createdAt
}
    `;
export const ServiceInfoFragmentDoc = `
    fragment ServiceInfo on Service {
  id
  title
  slug
  categoryId
  category {
    id
    title
    slug
  }
  customFields {
    ...CustomFieldInfo
  }
  model
  description
  createdAt
}
    ${CustomFieldInfoFragmentDoc}`;
export const ContentInfoFragmentDoc = `
    fragment ContentInfo on Content {
  id
  title
  content
  link
  createdBy {
    ...CreatedByInfo
  }
  service {
    ...ServiceInfo
  }
  createdAt
}
    ${CreatedByInfoFragmentDoc}
${ServiceInfoFragmentDoc}`;
export const SubKeywordInfoFragmentDoc = `
    fragment SubKeywordInfo on Keyword {
  id
  value
  subKeywords {
    id
    value
  }
}
    `;
export const ParentKeywordInfoFragmentDoc = `
    fragment ParentKeywordInfo on Keyword {
  id
  value
}
    `;
export const KeywordInfoFragmentDoc = `
    fragment KeywordInfo on Keyword {
  id
  value
  projectId
  description
  subKeywords {
    ...SubKeywordInfo
  }
  parentKeyword {
    ...ParentKeywordInfo
  }
  createdAt
}
    ${SubKeywordInfoFragmentDoc}
${ParentKeywordInfoFragmentDoc}`;
export const DocumentInfoFragmentDoc = `
    fragment DocumentInfo on Document {
  id
  title
  content
  outline
  userId
  projectId
  project {
    id
    name
    url
    description
  }
  title
  slug
  url
  description
  keywordId
  keyword {
    ...KeywordInfo
  }
  createdBy {
    ...CreatedByInfo
  }
  draftId
  hasDraft
  parentId
  createdAt
}
    ${KeywordInfoFragmentDoc}
${CreatedByInfoFragmentDoc}`;
export const EmailSignupInfoFragmentDoc = `
    fragment EmailSignupInfo on EmailSignup {
  email
}
    `;
export const LanguageInfoFragmentDoc = `
    fragment LanguageInfo on Language {
  id
  label
  value
  isDefault
  createdAt
}
    `;
export const PackagePeriodInfoFragmentDoc = `
    fragment PackagePeriodInfo on PackagePeriod {
  id
  name
  time
  order
  isActive
  createdAt
}
    `;
export const PackageItemInfoFragmentDoc = `
    fragment PackageItemInfo on PackageItem {
  id
  price
  freeTime
  isActive
  packageParentId
  packageParent {
    id
    name
    type
  }
  packagePeriodId
  packagePeriod {
    ...PackagePeriodInfo
  }
  content
  numberWord
  createdAt
}
    ${PackagePeriodInfoFragmentDoc}`;
export const PackageInfoFragmentDoc = `
    fragment PackageInfo on Package {
  id
  name
  type
  packageItems {
    ...PackageItemInfo
  }
  isActive
  isShow
  createdAt
}
    ${PackageItemInfoFragmentDoc}`;
export const PaymentHistoryInfoFragmentDoc = `
    fragment PaymentHistoryInfo on PaymentHistory {
  id
  amount
  transactionType
  isConfirm
  isCancel
  createdById
  createdBy {
    ...CreatedByInfo
  }
  confirmAt
  confirmById
  confirmBy {
    ...CreatedByInfo
  }
  cancelBy {
    ...CreatedByInfo
  }
  packageItem {
    ...PackageItemInfo
  }
  createdAt
}
    ${CreatedByInfoFragmentDoc}
${PackageItemInfoFragmentDoc}`;
export const PexelsInfoFragmentDoc = `
    fragment PexelsInfo on Pexels {
  id
  avg_color
  alt
  src
}
    `;
export const WorkspacePackageInfoFragmentDoc = `
    fragment WorkspacePackageInfo on WorkspacePackage {
  id
  packageItemId
  packageItem {
    ...PackageItemInfo
  }
  isActive
  startDateWord
  numberWord
  timeUseGpt4
  time
  freeTime
  createdAt
}
    ${PackageItemInfoFragmentDoc}`;
export const ProjectInfoFragmentDoc = `
    fragment ProjectInfo on Project {
  id
  name
  teamId
  default
  url
  description
  createdAt
}
    `;
export const UserInfoFragmentDoc = `
    fragment UserInfo on User {
  id
  email
  username
  fullname
  phoneNumber
  active
  isVerify
  role
  workspaceId
  isDeveloper
  workspace {
    id
    name
    bucket
    bucketSize
    description
    balance
    isOwner
    isTrial
    timeTrial
    expiredAt
    workspacePackage {
      ...WorkspacePackageInfo
    }
  }
  defaultTeamId
  defaultProjectId
  defaultProject {
    ...ProjectInfo
  }
  createdAt
}
    ${WorkspacePackageInfoFragmentDoc}
${ProjectInfoFragmentDoc}`;
export const WorkspaceInfoFragmentDoc = `
    fragment WorkspaceInfo on Workspace {
  id
  name
  description
  balance
  bucket
  owner {
    ...UserInfo
  }
  isOwner
  expiredAt
  isTrial
  timeTrial
  workspacePackage {
    ...WorkspacePackageInfo
  }
  createdAt
}
    ${UserInfoFragmentDoc}
${WorkspacePackageInfoFragmentDoc}`;
export const RequestHistoryInfoFragmentDoc = `
    fragment RequestHistoryInfo on RequestHistory {
  id
  tokens
  price
  user {
    ...CreatedByInfo
  }
  workspace {
    ...WorkspaceInfo
  }
  project {
    ...ProjectInfo
  }
  createdAt
}
    ${CreatedByInfoFragmentDoc}
${WorkspaceInfoFragmentDoc}
${ProjectInfoFragmentDoc}`;
export const ServiceCategoryInfoFragmentDoc = `
    fragment ServiceCategoryInfo on ServiceCategory {
  id
  title
  slug
  description
  order
  createdAt
  services {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;
export const ServiceDashboardInfoFragmentDoc = `
    fragment ServiceDashboardInfo on Service {
  id
  title
  slug
  categoryId
  category {
    id
    title
    slug
  }
  customFields {
    ...CustomFieldInfo
  }
  model
  isDelete
  leadingSentence
  leadingLanguage
  leadingStyleContent
  systemMessage
  description
  createdAt
}
    ${CustomFieldInfoFragmentDoc}`;
export const SettingInfoFragmentDoc = `
    fragment SettingInfo on Setting {
  id
  priceToken
  documentLink
  numberOfTimeUseGpt4
  timeTrial
  bonusBalanceSignup
  fieldTitle
  fieldDescription
  fieldMainKeyword
  fieldSubKeyword
  fieldParagraph
  fieldLanguage
  fieldStyleContent
}
    `;
export const PaginationInfoFragmentDoc = `
    fragment PaginationInfo on PaginationType {
  total
  page
  perPage
}
    `;
export const StyleContentInfoFragmentDoc = `
    fragment StyleContentInfo on StyleContent {
  id
  label
  value
  createdAt
}
    `;
export const MemberInfoFragmentDoc = `
    fragment MemberInfo on User {
  id
  fullname
  email
  role
  createdAt
}
    `;
export const TeamInfoFragmentDoc = `
    fragment TeamInfo on Team {
  id
  name
  ownerId
  members {
    ...MemberInfo
  }
  default
  createdAt
}
    ${MemberInfoFragmentDoc}`;
export const AiSettingAppsDocument = `
    query AiSettingApps {
  aiSettingApps {
    ...AiSettingAppInfo
  }
}
    ${AiSettingAppInfoFragmentDoc}`;
export const useAiSettingAppsQuery = <
      TData = AiSettingAppsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AiSettingAppsQueryVariables,
      options?: UseQueryOptions<AiSettingAppsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AiSettingAppsQuery, TError, TData>(
      variables === undefined ? ['AiSettingApps'] : ['AiSettingApps', variables],
      fetcher<AiSettingAppsQuery, AiSettingAppsQueryVariables>(client, AiSettingAppsDocument, variables, headers),
      options
    );

useAiSettingAppsQuery.getKey = (variables?: AiSettingAppsQueryVariables) => variables === undefined ? ['AiSettingApps'] : ['AiSettingApps', variables];
;

useAiSettingAppsQuery.fetcher = (client: GraphQLClient, variables?: AiSettingAppsQueryVariables, headers?: RequestInit['headers']) => fetcher<AiSettingAppsQuery, AiSettingAppsQueryVariables>(client, AiSettingAppsDocument, variables, headers);
export const CreateAiSettingAppDocument = `
    mutation CreateAiSettingApp($input: CreateAiSettingAppInputType) {
  createAiSettingApp(input: $input) {
    ...AiSettingAppInfo
  }
}
    ${AiSettingAppInfoFragmentDoc}`;
export const useCreateAiSettingAppMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAiSettingAppMutation, TError, CreateAiSettingAppMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAiSettingAppMutation, TError, CreateAiSettingAppMutationVariables, TContext>(
      ['CreateAiSettingApp'],
      (variables?: CreateAiSettingAppMutationVariables) => fetcher<CreateAiSettingAppMutation, CreateAiSettingAppMutationVariables>(client, CreateAiSettingAppDocument, variables, headers)(),
      options
    );
useCreateAiSettingAppMutation.fetcher = (client: GraphQLClient, variables?: CreateAiSettingAppMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateAiSettingAppMutation, CreateAiSettingAppMutationVariables>(client, CreateAiSettingAppDocument, variables, headers);
export const MeDocument = `
    query Me {
  me {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );

useMeQuery.getKey = (variables?: MeQueryVariables) => variables === undefined ? ['Me'] : ['Me', variables];
;

useMeQuery.fetcher = (client: GraphQLClient, variables?: MeQueryVariables, headers?: RequestInit['headers']) => fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers);
export const LoginDocument = `
    mutation Login($input: LoginInputType) {
  login(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
useLoginMutation.fetcher = (client: GraphQLClient, variables?: LoginMutationVariables, headers?: RequestInit['headers']) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers);
export const SignupVerifyDocument = `
    mutation SignupVerify($email: String!) {
  signupVerify(email: $email)
}
    `;
export const useSignupVerifyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupVerifyMutation, TError, SignupVerifyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupVerifyMutation, TError, SignupVerifyMutationVariables, TContext>(
      ['SignupVerify'],
      (variables?: SignupVerifyMutationVariables) => fetcher<SignupVerifyMutation, SignupVerifyMutationVariables>(client, SignupVerifyDocument, variables, headers)(),
      options
    );
useSignupVerifyMutation.fetcher = (client: GraphQLClient, variables: SignupVerifyMutationVariables, headers?: RequestInit['headers']) => fetcher<SignupVerifyMutation, SignupVerifyMutationVariables>(client, SignupVerifyDocument, variables, headers);
export const SignupWithCodeDocument = `
    mutation SignupWithCode($input: SignupWithCodeInputType) {
  signUpWithCode(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useSignupWithCodeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupWithCodeMutation, TError, SignupWithCodeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupWithCodeMutation, TError, SignupWithCodeMutationVariables, TContext>(
      ['SignupWithCode'],
      (variables?: SignupWithCodeMutationVariables) => fetcher<SignupWithCodeMutation, SignupWithCodeMutationVariables>(client, SignupWithCodeDocument, variables, headers)(),
      options
    );
useSignupWithCodeMutation.fetcher = (client: GraphQLClient, variables?: SignupWithCodeMutationVariables, headers?: RequestInit['headers']) => fetcher<SignupWithCodeMutation, SignupWithCodeMutationVariables>(client, SignupWithCodeDocument, variables, headers);
export const SignupDocument = `
    mutation Signup($input: SignupInputType) {
  signUp(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useSignupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupMutation, TError, SignupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
      ['Signup'],
      (variables?: SignupMutationVariables) => fetcher<SignupMutation, SignupMutationVariables>(client, SignupDocument, variables, headers)(),
      options
    );
useSignupMutation.fetcher = (client: GraphQLClient, variables?: SignupMutationVariables, headers?: RequestInit['headers']) => fetcher<SignupMutation, SignupMutationVariables>(client, SignupDocument, variables, headers);
export const ForgotPasswordDocument = `
    mutation ForgotPassword($input: ForgotPasswordInputType) {
  forgotPassword(input: $input)
}
    `;
export const useForgotPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>(
      ['ForgotPassword'],
      (variables?: ForgotPasswordMutationVariables) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(client, ForgotPasswordDocument, variables, headers)(),
      options
    );
useForgotPasswordMutation.fetcher = (client: GraphQLClient, variables?: ForgotPasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(client, ForgotPasswordDocument, variables, headers);
export const ResetPasswordDocument = `
    mutation ResetPassword($input: ResetPasswordInputType) {
  resetPassword(input: $input)
}
    `;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      ['ResetPassword'],
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(client, ResetPasswordDocument, variables, headers)(),
      options
    );
useResetPasswordMutation.fetcher = (client: GraphQLClient, variables?: ResetPasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(client, ResetPasswordDocument, variables, headers);
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      ['Logout'],
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
useLogoutMutation.fetcher = (client: GraphQLClient, variables?: LogoutMutationVariables, headers?: RequestInit['headers']) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers);
export const ListBuyWordAdminDocument = `
    query ListBuyWordAdmin($input: ListBuyWordAdminInputType) {
  listBuyWordAdmin(input: $input) {
    data {
      ...BuyWordInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${BuyWordInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useListBuyWordAdminQuery = <
      TData = ListBuyWordAdminQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ListBuyWordAdminQueryVariables,
      options?: UseQueryOptions<ListBuyWordAdminQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListBuyWordAdminQuery, TError, TData>(
      variables === undefined ? ['ListBuyWordAdmin'] : ['ListBuyWordAdmin', variables],
      fetcher<ListBuyWordAdminQuery, ListBuyWordAdminQueryVariables>(client, ListBuyWordAdminDocument, variables, headers),
      options
    );

useListBuyWordAdminQuery.getKey = (variables?: ListBuyWordAdminQueryVariables) => variables === undefined ? ['ListBuyWordAdmin'] : ['ListBuyWordAdmin', variables];
;

useListBuyWordAdminQuery.fetcher = (client: GraphQLClient, variables?: ListBuyWordAdminQueryVariables, headers?: RequestInit['headers']) => fetcher<ListBuyWordAdminQuery, ListBuyWordAdminQueryVariables>(client, ListBuyWordAdminDocument, variables, headers);
export const RequestBuyWordDocument = `
    mutation RequestBuyWord($input: RequestBuyWordInputType) {
  requestBuyWord(input: $input) {
    ...BuyWordInfo
  }
}
    ${BuyWordInfoFragmentDoc}`;
export const useRequestBuyWordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RequestBuyWordMutation, TError, RequestBuyWordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RequestBuyWordMutation, TError, RequestBuyWordMutationVariables, TContext>(
      ['RequestBuyWord'],
      (variables?: RequestBuyWordMutationVariables) => fetcher<RequestBuyWordMutation, RequestBuyWordMutationVariables>(client, RequestBuyWordDocument, variables, headers)(),
      options
    );
useRequestBuyWordMutation.fetcher = (client: GraphQLClient, variables?: RequestBuyWordMutationVariables, headers?: RequestInit['headers']) => fetcher<RequestBuyWordMutation, RequestBuyWordMutationVariables>(client, RequestBuyWordDocument, variables, headers);
export const ConfirmRequestBuyWordDocument = `
    mutation ConfirmRequestBuyWord($input: ConfirmRequestBuyWordInputType) {
  confirmRequestBuyWord(input: $input)
}
    `;
export const useConfirmRequestBuyWordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ConfirmRequestBuyWordMutation, TError, ConfirmRequestBuyWordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ConfirmRequestBuyWordMutation, TError, ConfirmRequestBuyWordMutationVariables, TContext>(
      ['ConfirmRequestBuyWord'],
      (variables?: ConfirmRequestBuyWordMutationVariables) => fetcher<ConfirmRequestBuyWordMutation, ConfirmRequestBuyWordMutationVariables>(client, ConfirmRequestBuyWordDocument, variables, headers)(),
      options
    );
useConfirmRequestBuyWordMutation.fetcher = (client: GraphQLClient, variables?: ConfirmRequestBuyWordMutationVariables, headers?: RequestInit['headers']) => fetcher<ConfirmRequestBuyWordMutation, ConfirmRequestBuyWordMutationVariables>(client, ConfirmRequestBuyWordDocument, variables, headers);
export const PageChannelsDocument = `
    query PageChannels($input: PageChannelsInputType) {
  pageChannels(input: $input) {
    data {
      ...PageChannelInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${PageChannelInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const usePageChannelsQuery = <
      TData = PageChannelsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PageChannelsQueryVariables,
      options?: UseQueryOptions<PageChannelsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PageChannelsQuery, TError, TData>(
      variables === undefined ? ['PageChannels'] : ['PageChannels', variables],
      fetcher<PageChannelsQuery, PageChannelsQueryVariables>(client, PageChannelsDocument, variables, headers),
      options
    );

usePageChannelsQuery.getKey = (variables?: PageChannelsQueryVariables) => variables === undefined ? ['PageChannels'] : ['PageChannels', variables];
;

usePageChannelsQuery.fetcher = (client: GraphQLClient, variables?: PageChannelsQueryVariables, headers?: RequestInit['headers']) => fetcher<PageChannelsQuery, PageChannelsQueryVariables>(client, PageChannelsDocument, variables, headers);
export const ConnectFacebookPageDocument = `
    mutation ConnectFacebookPage {
  connectFacebookPage
}
    `;
export const useConnectFacebookPageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ConnectFacebookPageMutation, TError, ConnectFacebookPageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ConnectFacebookPageMutation, TError, ConnectFacebookPageMutationVariables, TContext>(
      ['ConnectFacebookPage'],
      (variables?: ConnectFacebookPageMutationVariables) => fetcher<ConnectFacebookPageMutation, ConnectFacebookPageMutationVariables>(client, ConnectFacebookPageDocument, variables, headers)(),
      options
    );
useConnectFacebookPageMutation.fetcher = (client: GraphQLClient, variables?: ConnectFacebookPageMutationVariables, headers?: RequestInit['headers']) => fetcher<ConnectFacebookPageMutation, ConnectFacebookPageMutationVariables>(client, ConnectFacebookPageDocument, variables, headers);
export const SyncContentPageChannelDocument = `
    mutation SyncContentPageChannel($input: SyncContentPageChannelInputType) {
  syncContentPageChannel(input: $input)
}
    `;
export const useSyncContentPageChannelMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SyncContentPageChannelMutation, TError, SyncContentPageChannelMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SyncContentPageChannelMutation, TError, SyncContentPageChannelMutationVariables, TContext>(
      ['SyncContentPageChannel'],
      (variables?: SyncContentPageChannelMutationVariables) => fetcher<SyncContentPageChannelMutation, SyncContentPageChannelMutationVariables>(client, SyncContentPageChannelDocument, variables, headers)(),
      options
    );
useSyncContentPageChannelMutation.fetcher = (client: GraphQLClient, variables?: SyncContentPageChannelMutationVariables, headers?: RequestInit['headers']) => fetcher<SyncContentPageChannelMutation, SyncContentPageChannelMutationVariables>(client, SyncContentPageChannelDocument, variables, headers);
export const UpdatePageChannelDocument = `
    mutation UpdatePageChannel($input: UpdatePageChannelInputType) {
  updatePageChannel(input: $input) {
    ...PageChannelInfo
  }
}
    ${PageChannelInfoFragmentDoc}`;
export const useUpdatePageChannelMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePageChannelMutation, TError, UpdatePageChannelMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePageChannelMutation, TError, UpdatePageChannelMutationVariables, TContext>(
      ['UpdatePageChannel'],
      (variables?: UpdatePageChannelMutationVariables) => fetcher<UpdatePageChannelMutation, UpdatePageChannelMutationVariables>(client, UpdatePageChannelDocument, variables, headers)(),
      options
    );
useUpdatePageChannelMutation.fetcher = (client: GraphQLClient, variables?: UpdatePageChannelMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdatePageChannelMutation, UpdatePageChannelMutationVariables>(client, UpdatePageChannelDocument, variables, headers);
export const DeletePageChannelDocument = `
    mutation DeletePageChannel($id: ID) {
  deletePageChannel(id: $id)
}
    `;
export const useDeletePageChannelMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePageChannelMutation, TError, DeletePageChannelMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePageChannelMutation, TError, DeletePageChannelMutationVariables, TContext>(
      ['DeletePageChannel'],
      (variables?: DeletePageChannelMutationVariables) => fetcher<DeletePageChannelMutation, DeletePageChannelMutationVariables>(client, DeletePageChannelDocument, variables, headers)(),
      options
    );
useDeletePageChannelMutation.fetcher = (client: GraphQLClient, variables?: DeletePageChannelMutationVariables, headers?: RequestInit['headers']) => fetcher<DeletePageChannelMutation, DeletePageChannelMutationVariables>(client, DeletePageChannelDocument, variables, headers);
export const ConversationsDocument = `
    query Conversations($input: ConversationsInputType) {
  conversations(input: $input) {
    data {
      ...ConversationInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ConversationInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useConversationsQuery = <
      TData = ConversationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ConversationsQueryVariables,
      options?: UseQueryOptions<ConversationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ConversationsQuery, TError, TData>(
      variables === undefined ? ['Conversations'] : ['Conversations', variables],
      fetcher<ConversationsQuery, ConversationsQueryVariables>(client, ConversationsDocument, variables, headers),
      options
    );

useConversationsQuery.getKey = (variables?: ConversationsQueryVariables) => variables === undefined ? ['Conversations'] : ['Conversations', variables];
;

useConversationsQuery.fetcher = (client: GraphQLClient, variables?: ConversationsQueryVariables, headers?: RequestInit['headers']) => fetcher<ConversationsQuery, ConversationsQueryVariables>(client, ConversationsDocument, variables, headers);
export const ConversationDocument = `
    query Conversation($conversationId: ID) {
  conversation(conversationId: $conversationId) {
    ...ConversationInfo
  }
}
    ${ConversationInfoFragmentDoc}`;
export const useConversationQuery = <
      TData = ConversationQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ConversationQueryVariables,
      options?: UseQueryOptions<ConversationQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ConversationQuery, TError, TData>(
      variables === undefined ? ['Conversation'] : ['Conversation', variables],
      fetcher<ConversationQuery, ConversationQueryVariables>(client, ConversationDocument, variables, headers),
      options
    );

useConversationQuery.getKey = (variables?: ConversationQueryVariables) => variables === undefined ? ['Conversation'] : ['Conversation', variables];
;

useConversationQuery.fetcher = (client: GraphQLClient, variables?: ConversationQueryVariables, headers?: RequestInit['headers']) => fetcher<ConversationQuery, ConversationQueryVariables>(client, ConversationDocument, variables, headers);
export const AddConversationDocument = `
    mutation AddConversation($input: AddConversationInputType) {
  addConversation(input: $input) {
    ...ConversationInfo
  }
}
    ${ConversationInfoFragmentDoc}`;
export const useAddConversationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddConversationMutation, TError, AddConversationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddConversationMutation, TError, AddConversationMutationVariables, TContext>(
      ['AddConversation'],
      (variables?: AddConversationMutationVariables) => fetcher<AddConversationMutation, AddConversationMutationVariables>(client, AddConversationDocument, variables, headers)(),
      options
    );
useAddConversationMutation.fetcher = (client: GraphQLClient, variables?: AddConversationMutationVariables, headers?: RequestInit['headers']) => fetcher<AddConversationMutation, AddConversationMutationVariables>(client, AddConversationDocument, variables, headers);
export const UpdateConversationDocument = `
    mutation UpdateConversation($input: UpdateConversationInputType) {
  updateConversation(input: $input) {
    ...ConversationInfo
  }
}
    ${ConversationInfoFragmentDoc}`;
export const useUpdateConversationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateConversationMutation, TError, UpdateConversationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateConversationMutation, TError, UpdateConversationMutationVariables, TContext>(
      ['UpdateConversation'],
      (variables?: UpdateConversationMutationVariables) => fetcher<UpdateConversationMutation, UpdateConversationMutationVariables>(client, UpdateConversationDocument, variables, headers)(),
      options
    );
useUpdateConversationMutation.fetcher = (client: GraphQLClient, variables?: UpdateConversationMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateConversationMutation, UpdateConversationMutationVariables>(client, UpdateConversationDocument, variables, headers);
export const ListMessageConversationDocument = `
    query ListMessageConversation($input: ListMessageConversationInputType) {
  listMessageConversation(input: $input) {
    data {
      ...ConversationItemInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ConversationItemInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useListMessageConversationQuery = <
      TData = ListMessageConversationQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ListMessageConversationQueryVariables,
      options?: UseQueryOptions<ListMessageConversationQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListMessageConversationQuery, TError, TData>(
      variables === undefined ? ['ListMessageConversation'] : ['ListMessageConversation', variables],
      fetcher<ListMessageConversationQuery, ListMessageConversationQueryVariables>(client, ListMessageConversationDocument, variables, headers),
      options
    );

useListMessageConversationQuery.getKey = (variables?: ListMessageConversationQueryVariables) => variables === undefined ? ['ListMessageConversation'] : ['ListMessageConversation', variables];
;

useListMessageConversationQuery.fetcher = (client: GraphQLClient, variables?: ListMessageConversationQueryVariables, headers?: RequestInit['headers']) => fetcher<ListMessageConversationQuery, ListMessageConversationQueryVariables>(client, ListMessageConversationDocument, variables, headers);
export const DeleteConversationDocument = `
    mutation DeleteConversation($conversationId: ID) {
  deleteConversation(conversationId: $conversationId)
}
    `;
export const useDeleteConversationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteConversationMutation, TError, DeleteConversationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteConversationMutation, TError, DeleteConversationMutationVariables, TContext>(
      ['DeleteConversation'],
      (variables?: DeleteConversationMutationVariables) => fetcher<DeleteConversationMutation, DeleteConversationMutationVariables>(client, DeleteConversationDocument, variables, headers)(),
      options
    );
useDeleteConversationMutation.fetcher = (client: GraphQLClient, variables?: DeleteConversationMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteConversationMutation, DeleteConversationMutationVariables>(client, DeleteConversationDocument, variables, headers);
export const AddMessageInConversationDocument = `
    mutation AddMessageInConversation($input: ConversationItemInputType) {
  addMessageInConversation(input: $input) {
    ...ConversationItemInfo
  }
}
    ${ConversationItemInfoFragmentDoc}`;
export const useAddMessageInConversationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddMessageInConversationMutation, TError, AddMessageInConversationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddMessageInConversationMutation, TError, AddMessageInConversationMutationVariables, TContext>(
      ['AddMessageInConversation'],
      (variables?: AddMessageInConversationMutationVariables) => fetcher<AddMessageInConversationMutation, AddMessageInConversationMutationVariables>(client, AddMessageInConversationDocument, variables, headers)(),
      options
    );
useAddMessageInConversationMutation.fetcher = (client: GraphQLClient, variables?: AddMessageInConversationMutationVariables, headers?: RequestInit['headers']) => fetcher<AddMessageInConversationMutation, AddMessageInConversationMutationVariables>(client, AddMessageInConversationDocument, variables, headers);
export const DeleteMessageInConversationDocument = `
    mutation DeleteMessageInConversation($messageId: ID!) {
  deleteMessageInConversation(messageId: $messageId)
}
    `;
export const useDeleteMessageInConversationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteMessageInConversationMutation, TError, DeleteMessageInConversationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteMessageInConversationMutation, TError, DeleteMessageInConversationMutationVariables, TContext>(
      ['DeleteMessageInConversation'],
      (variables?: DeleteMessageInConversationMutationVariables) => fetcher<DeleteMessageInConversationMutation, DeleteMessageInConversationMutationVariables>(client, DeleteMessageInConversationDocument, variables, headers)(),
      options
    );
useDeleteMessageInConversationMutation.fetcher = (client: GraphQLClient, variables: DeleteMessageInConversationMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteMessageInConversationMutation, DeleteMessageInConversationMutationVariables>(client, DeleteMessageInConversationDocument, variables, headers);
export const ConversationDefaultDocument = `
    query ConversationDefault($projectId: ID) {
  conversationDefault(projectId: $projectId) {
    ...ConversationInfo
  }
}
    ${ConversationInfoFragmentDoc}`;
export const useConversationDefaultQuery = <
      TData = ConversationDefaultQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ConversationDefaultQueryVariables,
      options?: UseQueryOptions<ConversationDefaultQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ConversationDefaultQuery, TError, TData>(
      variables === undefined ? ['ConversationDefault'] : ['ConversationDefault', variables],
      fetcher<ConversationDefaultQuery, ConversationDefaultQueryVariables>(client, ConversationDefaultDocument, variables, headers),
      options
    );

useConversationDefaultQuery.getKey = (variables?: ConversationDefaultQueryVariables) => variables === undefined ? ['ConversationDefault'] : ['ConversationDefault', variables];
;

useConversationDefaultQuery.fetcher = (client: GraphQLClient, variables?: ConversationDefaultQueryVariables, headers?: RequestInit['headers']) => fetcher<ConversationDefaultQuery, ConversationDefaultQueryVariables>(client, ConversationDefaultDocument, variables, headers);
export const GetTotalTokenDocDocument = `
    mutation GetTotalTokenDoc($url: String) {
  getTotalTokenDoc(url: $url) {
    totalToken
    totalPrice
  }
}
    `;
export const useGetTotalTokenDocMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetTotalTokenDocMutation, TError, GetTotalTokenDocMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetTotalTokenDocMutation, TError, GetTotalTokenDocMutationVariables, TContext>(
      ['GetTotalTokenDoc'],
      (variables?: GetTotalTokenDocMutationVariables) => fetcher<GetTotalTokenDocMutation, GetTotalTokenDocMutationVariables>(client, GetTotalTokenDocDocument, variables, headers)(),
      options
    );
useGetTotalTokenDocMutation.fetcher = (client: GraphQLClient, variables?: GetTotalTokenDocMutationVariables, headers?: RequestInit['headers']) => fetcher<GetTotalTokenDocMutation, GetTotalTokenDocMutationVariables>(client, GetTotalTokenDocDocument, variables, headers);
export const EmbeddedDocumentDocument = `
    mutation EmbeddedDocument($documentId: ID!) {
  embeddedDocument(documentId: $documentId)
}
    `;
export const useEmbeddedDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EmbeddedDocumentMutation, TError, EmbeddedDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EmbeddedDocumentMutation, TError, EmbeddedDocumentMutationVariables, TContext>(
      ['EmbeddedDocument'],
      (variables?: EmbeddedDocumentMutationVariables) => fetcher<EmbeddedDocumentMutation, EmbeddedDocumentMutationVariables>(client, EmbeddedDocumentDocument, variables, headers)(),
      options
    );
useEmbeddedDocumentMutation.fetcher = (client: GraphQLClient, variables: EmbeddedDocumentMutationVariables, headers?: RequestInit['headers']) => fetcher<EmbeddedDocumentMutation, EmbeddedDocumentMutationVariables>(client, EmbeddedDocumentDocument, variables, headers);
export const ReSearchDocumentDocument = `
    mutation ReSearchDocument($input: ReSearchDocumentInputType) {
  reSearchDocument(input: $input)
}
    `;
export const useReSearchDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ReSearchDocumentMutation, TError, ReSearchDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ReSearchDocumentMutation, TError, ReSearchDocumentMutationVariables, TContext>(
      ['ReSearchDocument'],
      (variables?: ReSearchDocumentMutationVariables) => fetcher<ReSearchDocumentMutation, ReSearchDocumentMutationVariables>(client, ReSearchDocumentDocument, variables, headers)(),
      options
    );
useReSearchDocumentMutation.fetcher = (client: GraphQLClient, variables?: ReSearchDocumentMutationVariables, headers?: RequestInit['headers']) => fetcher<ReSearchDocumentMutation, ReSearchDocumentMutationVariables>(client, ReSearchDocumentDocument, variables, headers);
export const CodeDocument = `
    query Code($code: String!) {
  code(code: $code) {
    ...CodeInfo
  }
}
    ${CodeInfoFragmentDoc}`;
export const useCodeQuery = <
      TData = CodeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CodeQueryVariables,
      options?: UseQueryOptions<CodeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CodeQuery, TError, TData>(
      ['Code', variables],
      fetcher<CodeQuery, CodeQueryVariables>(client, CodeDocument, variables, headers),
      options
    );

useCodeQuery.getKey = (variables: CodeQueryVariables) => ['Code', variables];
;

useCodeQuery.fetcher = (client: GraphQLClient, variables: CodeQueryVariables, headers?: RequestInit['headers']) => fetcher<CodeQuery, CodeQueryVariables>(client, CodeDocument, variables, headers);
export const ContentsDocument = `
    query Contents($input: ContentsInputType) {
  contents(input: $input) {
    data {
      ...ContentInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ContentInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useContentsQuery = <
      TData = ContentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ContentsQueryVariables,
      options?: UseQueryOptions<ContentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ContentsQuery, TError, TData>(
      variables === undefined ? ['Contents'] : ['Contents', variables],
      fetcher<ContentsQuery, ContentsQueryVariables>(client, ContentsDocument, variables, headers),
      options
    );

useContentsQuery.getKey = (variables?: ContentsQueryVariables) => variables === undefined ? ['Contents'] : ['Contents', variables];
;

useContentsQuery.fetcher = (client: GraphQLClient, variables?: ContentsQueryVariables, headers?: RequestInit['headers']) => fetcher<ContentsQuery, ContentsQueryVariables>(client, ContentsDocument, variables, headers);
export const ContentDocument = `
    query Content($id: ID!) {
  content(id: $id) {
    ...ContentInfo
  }
}
    ${ContentInfoFragmentDoc}`;
export const useContentQuery = <
      TData = ContentQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ContentQueryVariables,
      options?: UseQueryOptions<ContentQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ContentQuery, TError, TData>(
      ['Content', variables],
      fetcher<ContentQuery, ContentQueryVariables>(client, ContentDocument, variables, headers),
      options
    );

useContentQuery.getKey = (variables: ContentQueryVariables) => ['Content', variables];
;

useContentQuery.fetcher = (client: GraphQLClient, variables: ContentQueryVariables, headers?: RequestInit['headers']) => fetcher<ContentQuery, ContentQueryVariables>(client, ContentDocument, variables, headers);
export const UpdateContentDocument = `
    mutation UpdateContent($input: UpdateContentInputType) {
  updateContent(input: $input) {
    ...ContentInfo
  }
}
    ${ContentInfoFragmentDoc}`;
export const useUpdateContentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateContentMutation, TError, UpdateContentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateContentMutation, TError, UpdateContentMutationVariables, TContext>(
      ['UpdateContent'],
      (variables?: UpdateContentMutationVariables) => fetcher<UpdateContentMutation, UpdateContentMutationVariables>(client, UpdateContentDocument, variables, headers)(),
      options
    );
useUpdateContentMutation.fetcher = (client: GraphQLClient, variables?: UpdateContentMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateContentMutation, UpdateContentMutationVariables>(client, UpdateContentDocument, variables, headers);
export const DeleteContentDocument = `
    mutation DeleteContent($id: ID!) {
  deleteContent(id: $id)
}
    `;
export const useDeleteContentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteContentMutation, TError, DeleteContentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteContentMutation, TError, DeleteContentMutationVariables, TContext>(
      ['DeleteContent'],
      (variables?: DeleteContentMutationVariables) => fetcher<DeleteContentMutation, DeleteContentMutationVariables>(client, DeleteContentDocument, variables, headers)(),
      options
    );
useDeleteContentMutation.fetcher = (client: GraphQLClient, variables: DeleteContentMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteContentMutation, DeleteContentMutationVariables>(client, DeleteContentDocument, variables, headers);
export const CustomFieldsDocument = `
    query CustomFields {
  customFields {
    ...CustomFieldInfo
  }
}
    ${CustomFieldInfoFragmentDoc}`;
export const useCustomFieldsQuery = <
      TData = CustomFieldsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CustomFieldsQueryVariables,
      options?: UseQueryOptions<CustomFieldsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CustomFieldsQuery, TError, TData>(
      variables === undefined ? ['CustomFields'] : ['CustomFields', variables],
      fetcher<CustomFieldsQuery, CustomFieldsQueryVariables>(client, CustomFieldsDocument, variables, headers),
      options
    );

useCustomFieldsQuery.getKey = (variables?: CustomFieldsQueryVariables) => variables === undefined ? ['CustomFields'] : ['CustomFields', variables];
;

useCustomFieldsQuery.fetcher = (client: GraphQLClient, variables?: CustomFieldsQueryVariables, headers?: RequestInit['headers']) => fetcher<CustomFieldsQuery, CustomFieldsQueryVariables>(client, CustomFieldsDocument, variables, headers);
export const AddCustomFieldDocument = `
    mutation AddCustomField($input: AddCustomFieldInputType) {
  addCustomField(input: $input) {
    ...CustomFieldInfo
  }
}
    ${CustomFieldInfoFragmentDoc}`;
export const useAddCustomFieldMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddCustomFieldMutation, TError, AddCustomFieldMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddCustomFieldMutation, TError, AddCustomFieldMutationVariables, TContext>(
      ['AddCustomField'],
      (variables?: AddCustomFieldMutationVariables) => fetcher<AddCustomFieldMutation, AddCustomFieldMutationVariables>(client, AddCustomFieldDocument, variables, headers)(),
      options
    );
useAddCustomFieldMutation.fetcher = (client: GraphQLClient, variables?: AddCustomFieldMutationVariables, headers?: RequestInit['headers']) => fetcher<AddCustomFieldMutation, AddCustomFieldMutationVariables>(client, AddCustomFieldDocument, variables, headers);
export const DeleteCustomFieldDocument = `
    mutation DeleteCustomField($id: ID!) {
  deleteCustomField(id: $id)
}
    `;
export const useDeleteCustomFieldMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCustomFieldMutation, TError, DeleteCustomFieldMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCustomFieldMutation, TError, DeleteCustomFieldMutationVariables, TContext>(
      ['DeleteCustomField'],
      (variables?: DeleteCustomFieldMutationVariables) => fetcher<DeleteCustomFieldMutation, DeleteCustomFieldMutationVariables>(client, DeleteCustomFieldDocument, variables, headers)(),
      options
    );
useDeleteCustomFieldMutation.fetcher = (client: GraphQLClient, variables: DeleteCustomFieldMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteCustomFieldMutation, DeleteCustomFieldMutationVariables>(client, DeleteCustomFieldDocument, variables, headers);
export const DocumentsDocument = `
    query Documents($input: DocumentsInputType) {
  documents(input: $input) {
    data {
      ...DocumentInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${DocumentInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useDocumentsQuery = <
      TData = DocumentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: DocumentsQueryVariables,
      options?: UseQueryOptions<DocumentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<DocumentsQuery, TError, TData>(
      variables === undefined ? ['Documents'] : ['Documents', variables],
      fetcher<DocumentsQuery, DocumentsQueryVariables>(client, DocumentsDocument, variables, headers),
      options
    );

useDocumentsQuery.getKey = (variables?: DocumentsQueryVariables) => variables === undefined ? ['Documents'] : ['Documents', variables];
;

useDocumentsQuery.fetcher = (client: GraphQLClient, variables?: DocumentsQueryVariables, headers?: RequestInit['headers']) => fetcher<DocumentsQuery, DocumentsQueryVariables>(client, DocumentsDocument, variables, headers);
export const DocumentDocument = `
    query Document($id: String!, $isDraft: Boolean) {
  document(id: $id, isDraft: $isDraft) {
    ...DocumentInfo
  }
}
    ${DocumentInfoFragmentDoc}`;
export const useDocumentQuery = <
      TData = DocumentQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: DocumentQueryVariables,
      options?: UseQueryOptions<DocumentQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<DocumentQuery, TError, TData>(
      ['Document', variables],
      fetcher<DocumentQuery, DocumentQueryVariables>(client, DocumentDocument, variables, headers),
      options
    );

useDocumentQuery.getKey = (variables: DocumentQueryVariables) => ['Document', variables];
;

useDocumentQuery.fetcher = (client: GraphQLClient, variables: DocumentQueryVariables, headers?: RequestInit['headers']) => fetcher<DocumentQuery, DocumentQueryVariables>(client, DocumentDocument, variables, headers);
export const CreateDocumentDocument = `
    mutation CreateDocument($input: DocumentDataInputType) {
  createDocument(input: $input) {
    ...DocumentInfo
  }
}
    ${DocumentInfoFragmentDoc}`;
export const useCreateDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateDocumentMutation, TError, CreateDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateDocumentMutation, TError, CreateDocumentMutationVariables, TContext>(
      ['CreateDocument'],
      (variables?: CreateDocumentMutationVariables) => fetcher<CreateDocumentMutation, CreateDocumentMutationVariables>(client, CreateDocumentDocument, variables, headers)(),
      options
    );
useCreateDocumentMutation.fetcher = (client: GraphQLClient, variables?: CreateDocumentMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateDocumentMutation, CreateDocumentMutationVariables>(client, CreateDocumentDocument, variables, headers);
export const SaveDraftDocumentDocument = `
    mutation SaveDraftDocument($input: UpdateDocumentInputType) {
  saveDraftDocument(input: $input) {
    ...DocumentInfo
  }
}
    ${DocumentInfoFragmentDoc}`;
export const useSaveDraftDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SaveDraftDocumentMutation, TError, SaveDraftDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SaveDraftDocumentMutation, TError, SaveDraftDocumentMutationVariables, TContext>(
      ['SaveDraftDocument'],
      (variables?: SaveDraftDocumentMutationVariables) => fetcher<SaveDraftDocumentMutation, SaveDraftDocumentMutationVariables>(client, SaveDraftDocumentDocument, variables, headers)(),
      options
    );
useSaveDraftDocumentMutation.fetcher = (client: GraphQLClient, variables?: SaveDraftDocumentMutationVariables, headers?: RequestInit['headers']) => fetcher<SaveDraftDocumentMutation, SaveDraftDocumentMutationVariables>(client, SaveDraftDocumentDocument, variables, headers);
export const UpdateDocumentDocument = `
    mutation UpdateDocument($input: UpdateDocumentInputType) {
  updateDocument(input: $input) {
    ...DocumentInfo
  }
}
    ${DocumentInfoFragmentDoc}`;
export const useUpdateDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateDocumentMutation, TError, UpdateDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateDocumentMutation, TError, UpdateDocumentMutationVariables, TContext>(
      ['UpdateDocument'],
      (variables?: UpdateDocumentMutationVariables) => fetcher<UpdateDocumentMutation, UpdateDocumentMutationVariables>(client, UpdateDocumentDocument, variables, headers)(),
      options
    );
useUpdateDocumentMutation.fetcher = (client: GraphQLClient, variables?: UpdateDocumentMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateDocumentMutation, UpdateDocumentMutationVariables>(client, UpdateDocumentDocument, variables, headers);
export const DeleteDocumentDocument = `
    mutation DeleteDocument($id: String!) {
  deleteDocument(id: $id)
}
    `;
export const useDeleteDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteDocumentMutation, TError, DeleteDocumentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteDocumentMutation, TError, DeleteDocumentMutationVariables, TContext>(
      ['DeleteDocument'],
      (variables?: DeleteDocumentMutationVariables) => fetcher<DeleteDocumentMutation, DeleteDocumentMutationVariables>(client, DeleteDocumentDocument, variables, headers)(),
      options
    );
useDeleteDocumentMutation.fetcher = (client: GraphQLClient, variables: DeleteDocumentMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteDocumentMutation, DeleteDocumentMutationVariables>(client, DeleteDocumentDocument, variables, headers);
export const GetEmailSignupDocument = `
    query GetEmailSignup($token: String!) {
  getEmailSignup(token: $token) {
    ...EmailSignupInfo
  }
}
    ${EmailSignupInfoFragmentDoc}`;
export const useGetEmailSignupQuery = <
      TData = GetEmailSignupQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetEmailSignupQueryVariables,
      options?: UseQueryOptions<GetEmailSignupQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetEmailSignupQuery, TError, TData>(
      ['GetEmailSignup', variables],
      fetcher<GetEmailSignupQuery, GetEmailSignupQueryVariables>(client, GetEmailSignupDocument, variables, headers),
      options
    );

useGetEmailSignupQuery.getKey = (variables: GetEmailSignupQueryVariables) => ['GetEmailSignup', variables];
;

useGetEmailSignupQuery.fetcher = (client: GraphQLClient, variables: GetEmailSignupQueryVariables, headers?: RequestInit['headers']) => fetcher<GetEmailSignupQuery, GetEmailSignupQueryVariables>(client, GetEmailSignupDocument, variables, headers);
export const ImagesDocument = `
    query Images($input: ImagesInputType) {
  images(input: $input) {
    data {
      ...ImageInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ImageInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useImagesQuery = <
      TData = ImagesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ImagesQueryVariables,
      options?: UseQueryOptions<ImagesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ImagesQuery, TError, TData>(
      variables === undefined ? ['Images'] : ['Images', variables],
      fetcher<ImagesQuery, ImagesQueryVariables>(client, ImagesDocument, variables, headers),
      options
    );

useImagesQuery.getKey = (variables?: ImagesQueryVariables) => variables === undefined ? ['Images'] : ['Images', variables];
;

useImagesQuery.fetcher = (client: GraphQLClient, variables?: ImagesQueryVariables, headers?: RequestInit['headers']) => fetcher<ImagesQuery, ImagesQueryVariables>(client, ImagesDocument, variables, headers);
export const ImageDocument = `
    query Image($id: String) {
  image(id: $id) {
    ...ImageInfo
  }
}
    ${ImageInfoFragmentDoc}`;
export const useImageQuery = <
      TData = ImageQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ImageQueryVariables,
      options?: UseQueryOptions<ImageQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ImageQuery, TError, TData>(
      variables === undefined ? ['Image'] : ['Image', variables],
      fetcher<ImageQuery, ImageQueryVariables>(client, ImageDocument, variables, headers),
      options
    );

useImageQuery.getKey = (variables?: ImageQueryVariables) => variables === undefined ? ['Image'] : ['Image', variables];
;

useImageQuery.fetcher = (client: GraphQLClient, variables?: ImageQueryVariables, headers?: RequestInit['headers']) => fetcher<ImageQuery, ImageQueryVariables>(client, ImageDocument, variables, headers);
export const FolderImagesDocument = `
    query FolderImages($input: FolderImagesInputType) {
  folderImages(input: $input) {
    data {
      ...FolderImageInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${FolderImageInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useFolderImagesQuery = <
      TData = FolderImagesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FolderImagesQueryVariables,
      options?: UseQueryOptions<FolderImagesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FolderImagesQuery, TError, TData>(
      variables === undefined ? ['FolderImages'] : ['FolderImages', variables],
      fetcher<FolderImagesQuery, FolderImagesQueryVariables>(client, FolderImagesDocument, variables, headers),
      options
    );

useFolderImagesQuery.getKey = (variables?: FolderImagesQueryVariables) => variables === undefined ? ['FolderImages'] : ['FolderImages', variables];
;

useFolderImagesQuery.fetcher = (client: GraphQLClient, variables?: FolderImagesQueryVariables, headers?: RequestInit['headers']) => fetcher<FolderImagesQuery, FolderImagesQueryVariables>(client, FolderImagesDocument, variables, headers);
export const FolderImageDocument = `
    query FolderImage($id: String) {
  folderImage(id: $id) {
    ...FolderImageInfo
  }
}
    ${FolderImageInfoFragmentDoc}`;
export const useFolderImageQuery = <
      TData = FolderImageQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FolderImageQueryVariables,
      options?: UseQueryOptions<FolderImageQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FolderImageQuery, TError, TData>(
      variables === undefined ? ['FolderImage'] : ['FolderImage', variables],
      fetcher<FolderImageQuery, FolderImageQueryVariables>(client, FolderImageDocument, variables, headers),
      options
    );

useFolderImageQuery.getKey = (variables?: FolderImageQueryVariables) => variables === undefined ? ['FolderImage'] : ['FolderImage', variables];
;

useFolderImageQuery.fetcher = (client: GraphQLClient, variables?: FolderImageQueryVariables, headers?: RequestInit['headers']) => fetcher<FolderImageQuery, FolderImageQueryVariables>(client, FolderImageDocument, variables, headers);
export const UpdateImageDocument = `
    mutation UpdateImage($input: UpdateImageInputType) {
  updateImage(input: $input) {
    ...ImageInfo
  }
}
    ${ImageInfoFragmentDoc}`;
export const useUpdateImageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateImageMutation, TError, UpdateImageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateImageMutation, TError, UpdateImageMutationVariables, TContext>(
      ['UpdateImage'],
      (variables?: UpdateImageMutationVariables) => fetcher<UpdateImageMutation, UpdateImageMutationVariables>(client, UpdateImageDocument, variables, headers)(),
      options
    );
useUpdateImageMutation.fetcher = (client: GraphQLClient, variables?: UpdateImageMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateImageMutation, UpdateImageMutationVariables>(client, UpdateImageDocument, variables, headers);
export const DeleteImageDocument = `
    mutation DeleteImage($id: String) {
  deleteImage(id: $id)
}
    `;
export const useDeleteImageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteImageMutation, TError, DeleteImageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteImageMutation, TError, DeleteImageMutationVariables, TContext>(
      ['DeleteImage'],
      (variables?: DeleteImageMutationVariables) => fetcher<DeleteImageMutation, DeleteImageMutationVariables>(client, DeleteImageDocument, variables, headers)(),
      options
    );
useDeleteImageMutation.fetcher = (client: GraphQLClient, variables?: DeleteImageMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteImageMutation, DeleteImageMutationVariables>(client, DeleteImageDocument, variables, headers);
export const AddFolderImageDocument = `
    mutation AddFolderImage($input: AddFolderImageInputType) {
  addFolderImage(input: $input) {
    ...FolderImageInfo
  }
}
    ${FolderImageInfoFragmentDoc}`;
export const useAddFolderImageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddFolderImageMutation, TError, AddFolderImageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddFolderImageMutation, TError, AddFolderImageMutationVariables, TContext>(
      ['AddFolderImage'],
      (variables?: AddFolderImageMutationVariables) => fetcher<AddFolderImageMutation, AddFolderImageMutationVariables>(client, AddFolderImageDocument, variables, headers)(),
      options
    );
useAddFolderImageMutation.fetcher = (client: GraphQLClient, variables?: AddFolderImageMutationVariables, headers?: RequestInit['headers']) => fetcher<AddFolderImageMutation, AddFolderImageMutationVariables>(client, AddFolderImageDocument, variables, headers);
export const DeleteFolderImageDocument = `
    mutation DeleteFolderImage($id: ID!) {
  deleteFolderImage(id: $id)
}
    `;
export const useDeleteFolderImageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteFolderImageMutation, TError, DeleteFolderImageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteFolderImageMutation, TError, DeleteFolderImageMutationVariables, TContext>(
      ['DeleteFolderImage'],
      (variables?: DeleteFolderImageMutationVariables) => fetcher<DeleteFolderImageMutation, DeleteFolderImageMutationVariables>(client, DeleteFolderImageDocument, variables, headers)(),
      options
    );
useDeleteFolderImageMutation.fetcher = (client: GraphQLClient, variables: DeleteFolderImageMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteFolderImageMutation, DeleteFolderImageMutationVariables>(client, DeleteFolderImageDocument, variables, headers);
export const UpdateFolderImageDocument = `
    mutation UpdateFolderImage($input: UpdateFolderImageInputType) {
  updateFolderImage(input: $input) {
    ...FolderImageInfo
  }
}
    ${FolderImageInfoFragmentDoc}`;
export const useUpdateFolderImageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateFolderImageMutation, TError, UpdateFolderImageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateFolderImageMutation, TError, UpdateFolderImageMutationVariables, TContext>(
      ['UpdateFolderImage'],
      (variables?: UpdateFolderImageMutationVariables) => fetcher<UpdateFolderImageMutation, UpdateFolderImageMutationVariables>(client, UpdateFolderImageDocument, variables, headers)(),
      options
    );
useUpdateFolderImageMutation.fetcher = (client: GraphQLClient, variables?: UpdateFolderImageMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateFolderImageMutation, UpdateFolderImageMutationVariables>(client, UpdateFolderImageDocument, variables, headers);
export const GenerateImageWithReplicateDocument = `
    mutation GenerateImageWithReplicate($prompt: String) {
  generateImageWithReplicate(prompt: $prompt)
}
    `;
export const useGenerateImageWithReplicateMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GenerateImageWithReplicateMutation, TError, GenerateImageWithReplicateMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GenerateImageWithReplicateMutation, TError, GenerateImageWithReplicateMutationVariables, TContext>(
      ['GenerateImageWithReplicate'],
      (variables?: GenerateImageWithReplicateMutationVariables) => fetcher<GenerateImageWithReplicateMutation, GenerateImageWithReplicateMutationVariables>(client, GenerateImageWithReplicateDocument, variables, headers)(),
      options
    );
useGenerateImageWithReplicateMutation.fetcher = (client: GraphQLClient, variables?: GenerateImageWithReplicateMutationVariables, headers?: RequestInit['headers']) => fetcher<GenerateImageWithReplicateMutation, GenerateImageWithReplicateMutationVariables>(client, GenerateImageWithReplicateDocument, variables, headers);
export const KeywordsDocument = `
    query Keywords($input: KeywordsInputType) {
  keywords(input: $input) {
    data {
      ...KeywordInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${KeywordInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useKeywordsQuery = <
      TData = KeywordsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: KeywordsQueryVariables,
      options?: UseQueryOptions<KeywordsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<KeywordsQuery, TError, TData>(
      variables === undefined ? ['Keywords'] : ['Keywords', variables],
      fetcher<KeywordsQuery, KeywordsQueryVariables>(client, KeywordsDocument, variables, headers),
      options
    );

useKeywordsQuery.getKey = (variables?: KeywordsQueryVariables) => variables === undefined ? ['Keywords'] : ['Keywords', variables];
;

useKeywordsQuery.fetcher = (client: GraphQLClient, variables?: KeywordsQueryVariables, headers?: RequestInit['headers']) => fetcher<KeywordsQuery, KeywordsQueryVariables>(client, KeywordsDocument, variables, headers);
export const SubKeywordsDocument = `
    query SubKeywords($input: SubKeywordsInputType) {
  subKeywords(input: $input) {
    data {
      ...KeywordInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${KeywordInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useSubKeywordsQuery = <
      TData = SubKeywordsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SubKeywordsQueryVariables,
      options?: UseQueryOptions<SubKeywordsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SubKeywordsQuery, TError, TData>(
      variables === undefined ? ['SubKeywords'] : ['SubKeywords', variables],
      fetcher<SubKeywordsQuery, SubKeywordsQueryVariables>(client, SubKeywordsDocument, variables, headers),
      options
    );

useSubKeywordsQuery.getKey = (variables?: SubKeywordsQueryVariables) => variables === undefined ? ['SubKeywords'] : ['SubKeywords', variables];
;

useSubKeywordsQuery.fetcher = (client: GraphQLClient, variables?: SubKeywordsQueryVariables, headers?: RequestInit['headers']) => fetcher<SubKeywordsQuery, SubKeywordsQueryVariables>(client, SubKeywordsDocument, variables, headers);
export const KeywordDocument = `
    query Keyword($id: String!) {
  keyword(id: $id) {
    ...KeywordInfo
  }
}
    ${KeywordInfoFragmentDoc}`;
export const useKeywordQuery = <
      TData = KeywordQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: KeywordQueryVariables,
      options?: UseQueryOptions<KeywordQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<KeywordQuery, TError, TData>(
      ['Keyword', variables],
      fetcher<KeywordQuery, KeywordQueryVariables>(client, KeywordDocument, variables, headers),
      options
    );

useKeywordQuery.getKey = (variables: KeywordQueryVariables) => ['Keyword', variables];
;

useKeywordQuery.fetcher = (client: GraphQLClient, variables: KeywordQueryVariables, headers?: RequestInit['headers']) => fetcher<KeywordQuery, KeywordQueryVariables>(client, KeywordDocument, variables, headers);
export const AddKeywordDocument = `
    mutation AddKeyword($input: KeywordDataInputType) {
  addKeyword(input: $input) {
    ...KeywordInfo
  }
}
    ${KeywordInfoFragmentDoc}`;
export const useAddKeywordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddKeywordMutation, TError, AddKeywordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddKeywordMutation, TError, AddKeywordMutationVariables, TContext>(
      ['AddKeyword'],
      (variables?: AddKeywordMutationVariables) => fetcher<AddKeywordMutation, AddKeywordMutationVariables>(client, AddKeywordDocument, variables, headers)(),
      options
    );
useAddKeywordMutation.fetcher = (client: GraphQLClient, variables?: AddKeywordMutationVariables, headers?: RequestInit['headers']) => fetcher<AddKeywordMutation, AddKeywordMutationVariables>(client, AddKeywordDocument, variables, headers);
export const UpdateKeywordDocument = `
    mutation UpdateKeyword($input: UpdateKeywordInputType) {
  updateKeyword(input: $input) {
    ...KeywordInfo
  }
}
    ${KeywordInfoFragmentDoc}`;
export const useUpdateKeywordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateKeywordMutation, TError, UpdateKeywordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateKeywordMutation, TError, UpdateKeywordMutationVariables, TContext>(
      ['UpdateKeyword'],
      (variables?: UpdateKeywordMutationVariables) => fetcher<UpdateKeywordMutation, UpdateKeywordMutationVariables>(client, UpdateKeywordDocument, variables, headers)(),
      options
    );
useUpdateKeywordMutation.fetcher = (client: GraphQLClient, variables?: UpdateKeywordMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateKeywordMutation, UpdateKeywordMutationVariables>(client, UpdateKeywordDocument, variables, headers);
export const DeleteKeywordDocument = `
    mutation DeleteKeyword($id: String!) {
  deleteKeyword(id: $id)
}
    `;
export const useDeleteKeywordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteKeywordMutation, TError, DeleteKeywordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteKeywordMutation, TError, DeleteKeywordMutationVariables, TContext>(
      ['DeleteKeyword'],
      (variables?: DeleteKeywordMutationVariables) => fetcher<DeleteKeywordMutation, DeleteKeywordMutationVariables>(client, DeleteKeywordDocument, variables, headers)(),
      options
    );
useDeleteKeywordMutation.fetcher = (client: GraphQLClient, variables: DeleteKeywordMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteKeywordMutation, DeleteKeywordMutationVariables>(client, DeleteKeywordDocument, variables, headers);
export const LanguagesDocument = `
    query Languages {
  languages {
    ...LanguageInfo
  }
}
    ${LanguageInfoFragmentDoc}`;
export const useLanguagesQuery = <
      TData = LanguagesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LanguagesQueryVariables,
      options?: UseQueryOptions<LanguagesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LanguagesQuery, TError, TData>(
      variables === undefined ? ['Languages'] : ['Languages', variables],
      fetcher<LanguagesQuery, LanguagesQueryVariables>(client, LanguagesDocument, variables, headers),
      options
    );

useLanguagesQuery.getKey = (variables?: LanguagesQueryVariables) => variables === undefined ? ['Languages'] : ['Languages', variables];
;

useLanguagesQuery.fetcher = (client: GraphQLClient, variables?: LanguagesQueryVariables, headers?: RequestInit['headers']) => fetcher<LanguagesQuery, LanguagesQueryVariables>(client, LanguagesDocument, variables, headers);
export const UpdateLanguageDocument = `
    mutation UpdateLanguage($input: UpdateLanguageInputType) {
  updateLanguage(input: $input) {
    ...LanguageInfo
  }
}
    ${LanguageInfoFragmentDoc}`;
export const useUpdateLanguageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateLanguageMutation, TError, UpdateLanguageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateLanguageMutation, TError, UpdateLanguageMutationVariables, TContext>(
      ['UpdateLanguage'],
      (variables?: UpdateLanguageMutationVariables) => fetcher<UpdateLanguageMutation, UpdateLanguageMutationVariables>(client, UpdateLanguageDocument, variables, headers)(),
      options
    );
useUpdateLanguageMutation.fetcher = (client: GraphQLClient, variables?: UpdateLanguageMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateLanguageMutation, UpdateLanguageMutationVariables>(client, UpdateLanguageDocument, variables, headers);
export const DeleteLanguageDocument = `
    mutation DeleteLanguage($id: ID!) {
  deleteLanguage(id: $id)
}
    `;
export const useDeleteLanguageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteLanguageMutation, TError, DeleteLanguageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteLanguageMutation, TError, DeleteLanguageMutationVariables, TContext>(
      ['DeleteLanguage'],
      (variables?: DeleteLanguageMutationVariables) => fetcher<DeleteLanguageMutation, DeleteLanguageMutationVariables>(client, DeleteLanguageDocument, variables, headers)(),
      options
    );
useDeleteLanguageMutation.fetcher = (client: GraphQLClient, variables: DeleteLanguageMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteLanguageMutation, DeleteLanguageMutationVariables>(client, DeleteLanguageDocument, variables, headers);
export const PackagesDocument = `
    query Packages {
  packages {
    ...PackageInfo
  }
}
    ${PackageInfoFragmentDoc}`;
export const usePackagesQuery = <
      TData = PackagesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PackagesQueryVariables,
      options?: UseQueryOptions<PackagesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PackagesQuery, TError, TData>(
      variables === undefined ? ['Packages'] : ['Packages', variables],
      fetcher<PackagesQuery, PackagesQueryVariables>(client, PackagesDocument, variables, headers),
      options
    );

usePackagesQuery.getKey = (variables?: PackagesQueryVariables) => variables === undefined ? ['Packages'] : ['Packages', variables];
;

usePackagesQuery.fetcher = (client: GraphQLClient, variables?: PackagesQueryVariables, headers?: RequestInit['headers']) => fetcher<PackagesQuery, PackagesQueryVariables>(client, PackagesDocument, variables, headers);
export const PackagePeriodsDocument = `
    query PackagePeriods {
  packagePeriods {
    ...PackagePeriodInfo
  }
}
    ${PackagePeriodInfoFragmentDoc}`;
export const usePackagePeriodsQuery = <
      TData = PackagePeriodsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PackagePeriodsQueryVariables,
      options?: UseQueryOptions<PackagePeriodsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PackagePeriodsQuery, TError, TData>(
      variables === undefined ? ['PackagePeriods'] : ['PackagePeriods', variables],
      fetcher<PackagePeriodsQuery, PackagePeriodsQueryVariables>(client, PackagePeriodsDocument, variables, headers),
      options
    );

usePackagePeriodsQuery.getKey = (variables?: PackagePeriodsQueryVariables) => variables === undefined ? ['PackagePeriods'] : ['PackagePeriods', variables];
;

usePackagePeriodsQuery.fetcher = (client: GraphQLClient, variables?: PackagePeriodsQueryVariables, headers?: RequestInit['headers']) => fetcher<PackagePeriodsQuery, PackagePeriodsQueryVariables>(client, PackagePeriodsDocument, variables, headers);
export const PricingDocument = `
    query Pricing {
  pricing {
    packages {
      ...PackageInfo
    }
  }
}
    ${PackageInfoFragmentDoc}`;
export const usePricingQuery = <
      TData = PricingQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PricingQueryVariables,
      options?: UseQueryOptions<PricingQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PricingQuery, TError, TData>(
      variables === undefined ? ['Pricing'] : ['Pricing', variables],
      fetcher<PricingQuery, PricingQueryVariables>(client, PricingDocument, variables, headers),
      options
    );

usePricingQuery.getKey = (variables?: PricingQueryVariables) => variables === undefined ? ['Pricing'] : ['Pricing', variables];
;

usePricingQuery.fetcher = (client: GraphQLClient, variables?: PricingQueryVariables, headers?: RequestInit['headers']) => fetcher<PricingQuery, PricingQueryVariables>(client, PricingDocument, variables, headers);
export const UpdatePackageDocument = `
    mutation UpdatePackage($input: UpdatePackageInputType) {
  updatePackage(input: $input) {
    ...PackageInfo
  }
}
    ${PackageInfoFragmentDoc}`;
export const useUpdatePackageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePackageMutation, TError, UpdatePackageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePackageMutation, TError, UpdatePackageMutationVariables, TContext>(
      ['UpdatePackage'],
      (variables?: UpdatePackageMutationVariables) => fetcher<UpdatePackageMutation, UpdatePackageMutationVariables>(client, UpdatePackageDocument, variables, headers)(),
      options
    );
useUpdatePackageMutation.fetcher = (client: GraphQLClient, variables?: UpdatePackageMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdatePackageMutation, UpdatePackageMutationVariables>(client, UpdatePackageDocument, variables, headers);
export const UpdatePackagePeriodDocument = `
    mutation UpdatePackagePeriod($input: UpdatePackagePeriodInputType) {
  updatePackagePeriod(input: $input) {
    ...PackagePeriodInfo
  }
}
    ${PackagePeriodInfoFragmentDoc}`;
export const useUpdatePackagePeriodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePackagePeriodMutation, TError, UpdatePackagePeriodMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePackagePeriodMutation, TError, UpdatePackagePeriodMutationVariables, TContext>(
      ['UpdatePackagePeriod'],
      (variables?: UpdatePackagePeriodMutationVariables) => fetcher<UpdatePackagePeriodMutation, UpdatePackagePeriodMutationVariables>(client, UpdatePackagePeriodDocument, variables, headers)(),
      options
    );
useUpdatePackagePeriodMutation.fetcher = (client: GraphQLClient, variables?: UpdatePackagePeriodMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdatePackagePeriodMutation, UpdatePackagePeriodMutationVariables>(client, UpdatePackagePeriodDocument, variables, headers);
export const UpdatePackageItemDocument = `
    mutation UpdatePackageItem($input: UpdatePackageItemInputType) {
  updatePackageItem(input: $input) {
    ...PackageItemInfo
  }
}
    ${PackageItemInfoFragmentDoc}`;
export const useUpdatePackageItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePackageItemMutation, TError, UpdatePackageItemMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePackageItemMutation, TError, UpdatePackageItemMutationVariables, TContext>(
      ['UpdatePackageItem'],
      (variables?: UpdatePackageItemMutationVariables) => fetcher<UpdatePackageItemMutation, UpdatePackageItemMutationVariables>(client, UpdatePackageItemDocument, variables, headers)(),
      options
    );
useUpdatePackageItemMutation.fetcher = (client: GraphQLClient, variables?: UpdatePackageItemMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdatePackageItemMutation, UpdatePackageItemMutationVariables>(client, UpdatePackageItemDocument, variables, headers);
export const CreatePaymentHistoryDocument = `
    mutation CreatePaymentHistory($input: CreatePaymentHistoryInputType) {
  createPaymentHistory(input: $input)
}
    `;
export const useCreatePaymentHistoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePaymentHistoryMutation, TError, CreatePaymentHistoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePaymentHistoryMutation, TError, CreatePaymentHistoryMutationVariables, TContext>(
      ['CreatePaymentHistory'],
      (variables?: CreatePaymentHistoryMutationVariables) => fetcher<CreatePaymentHistoryMutation, CreatePaymentHistoryMutationVariables>(client, CreatePaymentHistoryDocument, variables, headers)(),
      options
    );
useCreatePaymentHistoryMutation.fetcher = (client: GraphQLClient, variables?: CreatePaymentHistoryMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePaymentHistoryMutation, CreatePaymentHistoryMutationVariables>(client, CreatePaymentHistoryDocument, variables, headers);
export const PaymentHistoriesUserDocument = `
    query PaymentHistoriesUser($input: PaymentHistoriesInputType) {
  paymentHistoriesUser(input: $input) {
    data {
      ...PaymentHistoryInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${PaymentHistoryInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const usePaymentHistoriesUserQuery = <
      TData = PaymentHistoriesUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PaymentHistoriesUserQueryVariables,
      options?: UseQueryOptions<PaymentHistoriesUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PaymentHistoriesUserQuery, TError, TData>(
      variables === undefined ? ['PaymentHistoriesUser'] : ['PaymentHistoriesUser', variables],
      fetcher<PaymentHistoriesUserQuery, PaymentHistoriesUserQueryVariables>(client, PaymentHistoriesUserDocument, variables, headers),
      options
    );

usePaymentHistoriesUserQuery.getKey = (variables?: PaymentHistoriesUserQueryVariables) => variables === undefined ? ['PaymentHistoriesUser'] : ['PaymentHistoriesUser', variables];
;

usePaymentHistoriesUserQuery.fetcher = (client: GraphQLClient, variables?: PaymentHistoriesUserQueryVariables, headers?: RequestInit['headers']) => fetcher<PaymentHistoriesUserQuery, PaymentHistoriesUserQueryVariables>(client, PaymentHistoriesUserDocument, variables, headers);
export const PaymentHistoriesAdminDocument = `
    query PaymentHistoriesAdmin($input: PaymentHistoriesAdminInputType) {
  paymentHistoriesAdmin(input: $input) {
    data {
      ...PaymentHistoryInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${PaymentHistoryInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const usePaymentHistoriesAdminQuery = <
      TData = PaymentHistoriesAdminQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PaymentHistoriesAdminQueryVariables,
      options?: UseQueryOptions<PaymentHistoriesAdminQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PaymentHistoriesAdminQuery, TError, TData>(
      variables === undefined ? ['PaymentHistoriesAdmin'] : ['PaymentHistoriesAdmin', variables],
      fetcher<PaymentHistoriesAdminQuery, PaymentHistoriesAdminQueryVariables>(client, PaymentHistoriesAdminDocument, variables, headers),
      options
    );

usePaymentHistoriesAdminQuery.getKey = (variables?: PaymentHistoriesAdminQueryVariables) => variables === undefined ? ['PaymentHistoriesAdmin'] : ['PaymentHistoriesAdmin', variables];
;

usePaymentHistoriesAdminQuery.fetcher = (client: GraphQLClient, variables?: PaymentHistoriesAdminQueryVariables, headers?: RequestInit['headers']) => fetcher<PaymentHistoriesAdminQuery, PaymentHistoriesAdminQueryVariables>(client, PaymentHistoriesAdminDocument, variables, headers);
export const ConfirmPaymentHistoryDocument = `
    mutation ConfirmPaymentHistory($id: ID!) {
  confirmPaymentHistory(id: $id) {
    ...PaymentHistoryInfo
  }
}
    ${PaymentHistoryInfoFragmentDoc}`;
export const useConfirmPaymentHistoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ConfirmPaymentHistoryMutation, TError, ConfirmPaymentHistoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ConfirmPaymentHistoryMutation, TError, ConfirmPaymentHistoryMutationVariables, TContext>(
      ['ConfirmPaymentHistory'],
      (variables?: ConfirmPaymentHistoryMutationVariables) => fetcher<ConfirmPaymentHistoryMutation, ConfirmPaymentHistoryMutationVariables>(client, ConfirmPaymentHistoryDocument, variables, headers)(),
      options
    );
useConfirmPaymentHistoryMutation.fetcher = (client: GraphQLClient, variables: ConfirmPaymentHistoryMutationVariables, headers?: RequestInit['headers']) => fetcher<ConfirmPaymentHistoryMutation, ConfirmPaymentHistoryMutationVariables>(client, ConfirmPaymentHistoryDocument, variables, headers);
export const CancelPaymentHistoryDocument = `
    mutation CancelPaymentHistory($id: ID!) {
  cancelPaymentHistory(id: $id) {
    ...PaymentHistoryInfo
  }
}
    ${PaymentHistoryInfoFragmentDoc}`;
export const useCancelPaymentHistoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CancelPaymentHistoryMutation, TError, CancelPaymentHistoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CancelPaymentHistoryMutation, TError, CancelPaymentHistoryMutationVariables, TContext>(
      ['CancelPaymentHistory'],
      (variables?: CancelPaymentHistoryMutationVariables) => fetcher<CancelPaymentHistoryMutation, CancelPaymentHistoryMutationVariables>(client, CancelPaymentHistoryDocument, variables, headers)(),
      options
    );
useCancelPaymentHistoryMutation.fetcher = (client: GraphQLClient, variables: CancelPaymentHistoryMutationVariables, headers?: RequestInit['headers']) => fetcher<CancelPaymentHistoryMutation, CancelPaymentHistoryMutationVariables>(client, CancelPaymentHistoryDocument, variables, headers);
export const DeletePaymentHistoryDocument = `
    mutation DeletePaymentHistory($id: ID!) {
  deletePaymentHistory(id: $id)
}
    `;
export const useDeletePaymentHistoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePaymentHistoryMutation, TError, DeletePaymentHistoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePaymentHistoryMutation, TError, DeletePaymentHistoryMutationVariables, TContext>(
      ['DeletePaymentHistory'],
      (variables?: DeletePaymentHistoryMutationVariables) => fetcher<DeletePaymentHistoryMutation, DeletePaymentHistoryMutationVariables>(client, DeletePaymentHistoryDocument, variables, headers)(),
      options
    );
useDeletePaymentHistoryMutation.fetcher = (client: GraphQLClient, variables: DeletePaymentHistoryMutationVariables, headers?: RequestInit['headers']) => fetcher<DeletePaymentHistoryMutation, DeletePaymentHistoryMutationVariables>(client, DeletePaymentHistoryDocument, variables, headers);
export const PexelsPhotosDocument = `
    query PexelsPhotos($input: PexelsPhotosInputType) {
  pexelsPhotos(input: $input) {
    data {
      ...PexelsInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${PexelsInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const usePexelsPhotosQuery = <
      TData = PexelsPhotosQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PexelsPhotosQueryVariables,
      options?: UseQueryOptions<PexelsPhotosQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PexelsPhotosQuery, TError, TData>(
      variables === undefined ? ['PexelsPhotos'] : ['PexelsPhotos', variables],
      fetcher<PexelsPhotosQuery, PexelsPhotosQueryVariables>(client, PexelsPhotosDocument, variables, headers),
      options
    );

usePexelsPhotosQuery.getKey = (variables?: PexelsPhotosQueryVariables) => variables === undefined ? ['PexelsPhotos'] : ['PexelsPhotos', variables];
;

usePexelsPhotosQuery.fetcher = (client: GraphQLClient, variables?: PexelsPhotosQueryVariables, headers?: RequestInit['headers']) => fetcher<PexelsPhotosQuery, PexelsPhotosQueryVariables>(client, PexelsPhotosDocument, variables, headers);
export const ProjectsDocument = `
    query Projects($input: ProjectsInputType) {
  projects(input: $input) {
    data {
      ...ProjectInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ProjectInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ProjectsQueryVariables,
      options?: UseQueryOptions<ProjectsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProjectsQuery, TError, TData>(
      variables === undefined ? ['Projects'] : ['Projects', variables],
      fetcher<ProjectsQuery, ProjectsQueryVariables>(client, ProjectsDocument, variables, headers),
      options
    );

useProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['Projects'] : ['Projects', variables];
;

useProjectsQuery.fetcher = (client: GraphQLClient, variables?: ProjectsQueryVariables, headers?: RequestInit['headers']) => fetcher<ProjectsQuery, ProjectsQueryVariables>(client, ProjectsDocument, variables, headers);
export const ProjectDocument = `
    query Project($id: String!) {
  project(id: $id) {
    ...ProjectInfo
  }
}
    ${ProjectInfoFragmentDoc}`;
export const useProjectQuery = <
      TData = ProjectQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProjectQueryVariables,
      options?: UseQueryOptions<ProjectQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProjectQuery, TError, TData>(
      ['Project', variables],
      fetcher<ProjectQuery, ProjectQueryVariables>(client, ProjectDocument, variables, headers),
      options
    );

useProjectQuery.getKey = (variables: ProjectQueryVariables) => ['Project', variables];
;

useProjectQuery.fetcher = (client: GraphQLClient, variables: ProjectQueryVariables, headers?: RequestInit['headers']) => fetcher<ProjectQuery, ProjectQueryVariables>(client, ProjectDocument, variables, headers);
export const ProjectDefaultDocument = `
    query ProjectDefault {
  projectDefault {
    ...ProjectInfo
  }
}
    ${ProjectInfoFragmentDoc}`;
export const useProjectDefaultQuery = <
      TData = ProjectDefaultQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ProjectDefaultQueryVariables,
      options?: UseQueryOptions<ProjectDefaultQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProjectDefaultQuery, TError, TData>(
      variables === undefined ? ['ProjectDefault'] : ['ProjectDefault', variables],
      fetcher<ProjectDefaultQuery, ProjectDefaultQueryVariables>(client, ProjectDefaultDocument, variables, headers),
      options
    );

useProjectDefaultQuery.getKey = (variables?: ProjectDefaultQueryVariables) => variables === undefined ? ['ProjectDefault'] : ['ProjectDefault', variables];
;

useProjectDefaultQuery.fetcher = (client: GraphQLClient, variables?: ProjectDefaultQueryVariables, headers?: RequestInit['headers']) => fetcher<ProjectDefaultQuery, ProjectDefaultQueryVariables>(client, ProjectDefaultDocument, variables, headers);
export const AddProjectDocument = `
    mutation AddProject($input: ProjectDataInputType) {
  addProject(input: $input) {
    ...ProjectInfo
  }
}
    ${ProjectInfoFragmentDoc}`;
export const useAddProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddProjectMutation, TError, AddProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddProjectMutation, TError, AddProjectMutationVariables, TContext>(
      ['AddProject'],
      (variables?: AddProjectMutationVariables) => fetcher<AddProjectMutation, AddProjectMutationVariables>(client, AddProjectDocument, variables, headers)(),
      options
    );
useAddProjectMutation.fetcher = (client: GraphQLClient, variables?: AddProjectMutationVariables, headers?: RequestInit['headers']) => fetcher<AddProjectMutation, AddProjectMutationVariables>(client, AddProjectDocument, variables, headers);
export const UpdateProjectDocument = `
    mutation UpdateProject($input: UpdateProjectInputType) {
  updateProject(input: $input) {
    ...ProjectInfo
  }
}
    ${ProjectInfoFragmentDoc}`;
export const useUpdateProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>(
      ['UpdateProject'],
      (variables?: UpdateProjectMutationVariables) => fetcher<UpdateProjectMutation, UpdateProjectMutationVariables>(client, UpdateProjectDocument, variables, headers)(),
      options
    );
useUpdateProjectMutation.fetcher = (client: GraphQLClient, variables?: UpdateProjectMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateProjectMutation, UpdateProjectMutationVariables>(client, UpdateProjectDocument, variables, headers);
export const ChangeDefaultProjectDocument = `
    mutation ChangeDefaultProject($input: ChangeDefaultProjectInputType) {
  changeDefaultProject(input: $input) {
    ...ProjectInfo
  }
}
    ${ProjectInfoFragmentDoc}`;
export const useChangeDefaultProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeDefaultProjectMutation, TError, ChangeDefaultProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeDefaultProjectMutation, TError, ChangeDefaultProjectMutationVariables, TContext>(
      ['ChangeDefaultProject'],
      (variables?: ChangeDefaultProjectMutationVariables) => fetcher<ChangeDefaultProjectMutation, ChangeDefaultProjectMutationVariables>(client, ChangeDefaultProjectDocument, variables, headers)(),
      options
    );
useChangeDefaultProjectMutation.fetcher = (client: GraphQLClient, variables?: ChangeDefaultProjectMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeDefaultProjectMutation, ChangeDefaultProjectMutationVariables>(client, ChangeDefaultProjectDocument, variables, headers);
export const DeleteProjectDocument = `
    mutation DeleteProject($id: String!) {
  deleteProject(id: $id)
}
    `;
export const useDeleteProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>(
      ['DeleteProject'],
      (variables?: DeleteProjectMutationVariables) => fetcher<DeleteProjectMutation, DeleteProjectMutationVariables>(client, DeleteProjectDocument, variables, headers)(),
      options
    );
useDeleteProjectMutation.fetcher = (client: GraphQLClient, variables: DeleteProjectMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteProjectMutation, DeleteProjectMutationVariables>(client, DeleteProjectDocument, variables, headers);
export const ChangeDefaultProjectUserDocument = `
    mutation ChangeDefaultProjectUser($projectId: ID!) {
  changeDefaultProjectUser(projectId: $projectId) {
    ...ProjectInfo
  }
}
    ${ProjectInfoFragmentDoc}`;
export const useChangeDefaultProjectUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeDefaultProjectUserMutation, TError, ChangeDefaultProjectUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeDefaultProjectUserMutation, TError, ChangeDefaultProjectUserMutationVariables, TContext>(
      ['ChangeDefaultProjectUser'],
      (variables?: ChangeDefaultProjectUserMutationVariables) => fetcher<ChangeDefaultProjectUserMutation, ChangeDefaultProjectUserMutationVariables>(client, ChangeDefaultProjectUserDocument, variables, headers)(),
      options
    );
useChangeDefaultProjectUserMutation.fetcher = (client: GraphQLClient, variables: ChangeDefaultProjectUserMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeDefaultProjectUserMutation, ChangeDefaultProjectUserMutationVariables>(client, ChangeDefaultProjectUserDocument, variables, headers);
export const RequestHistoriesDocument = `
    query RequestHistories($input: RequestHistoriesInputType) {
  requestHistories(input: $input) {
    data {
      ...RequestHistoryInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${RequestHistoryInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useRequestHistoriesQuery = <
      TData = RequestHistoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: RequestHistoriesQueryVariables,
      options?: UseQueryOptions<RequestHistoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RequestHistoriesQuery, TError, TData>(
      variables === undefined ? ['RequestHistories'] : ['RequestHistories', variables],
      fetcher<RequestHistoriesQuery, RequestHistoriesQueryVariables>(client, RequestHistoriesDocument, variables, headers),
      options
    );

useRequestHistoriesQuery.getKey = (variables?: RequestHistoriesQueryVariables) => variables === undefined ? ['RequestHistories'] : ['RequestHistories', variables];
;

useRequestHistoriesQuery.fetcher = (client: GraphQLClient, variables?: RequestHistoriesQueryVariables, headers?: RequestInit['headers']) => fetcher<RequestHistoriesQuery, RequestHistoriesQueryVariables>(client, RequestHistoriesDocument, variables, headers);
export const ServiceCategoriesDocument = `
    query ServiceCategories($input: ServiceCategoriesInputType) {
  serviceCategories(input: $input) {
    data {
      ...ServiceCategoryInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ServiceCategoryInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useServiceCategoriesQuery = <
      TData = ServiceCategoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ServiceCategoriesQueryVariables,
      options?: UseQueryOptions<ServiceCategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ServiceCategoriesQuery, TError, TData>(
      variables === undefined ? ['ServiceCategories'] : ['ServiceCategories', variables],
      fetcher<ServiceCategoriesQuery, ServiceCategoriesQueryVariables>(client, ServiceCategoriesDocument, variables, headers),
      options
    );

useServiceCategoriesQuery.getKey = (variables?: ServiceCategoriesQueryVariables) => variables === undefined ? ['ServiceCategories'] : ['ServiceCategories', variables];
;

useServiceCategoriesQuery.fetcher = (client: GraphQLClient, variables?: ServiceCategoriesQueryVariables, headers?: RequestInit['headers']) => fetcher<ServiceCategoriesQuery, ServiceCategoriesQueryVariables>(client, ServiceCategoriesDocument, variables, headers);
export const ServiceCategoriesCustomerDocument = `
    query ServiceCategoriesCustomer($search: String) {
  serviceCategoriesCustomer(search: $search) {
    ...ServiceCategoryInfo
  }
}
    ${ServiceCategoryInfoFragmentDoc}`;
export const useServiceCategoriesCustomerQuery = <
      TData = ServiceCategoriesCustomerQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ServiceCategoriesCustomerQueryVariables,
      options?: UseQueryOptions<ServiceCategoriesCustomerQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ServiceCategoriesCustomerQuery, TError, TData>(
      variables === undefined ? ['ServiceCategoriesCustomer'] : ['ServiceCategoriesCustomer', variables],
      fetcher<ServiceCategoriesCustomerQuery, ServiceCategoriesCustomerQueryVariables>(client, ServiceCategoriesCustomerDocument, variables, headers),
      options
    );

useServiceCategoriesCustomerQuery.getKey = (variables?: ServiceCategoriesCustomerQueryVariables) => variables === undefined ? ['ServiceCategoriesCustomer'] : ['ServiceCategoriesCustomer', variables];
;

useServiceCategoriesCustomerQuery.fetcher = (client: GraphQLClient, variables?: ServiceCategoriesCustomerQueryVariables, headers?: RequestInit['headers']) => fetcher<ServiceCategoriesCustomerQuery, ServiceCategoriesCustomerQueryVariables>(client, ServiceCategoriesCustomerDocument, variables, headers);
export const ServiceCategoryDocument = `
    query ServiceCategory($id: String!) {
  serviceCategory(id: $id) {
    ...ServiceCategoryInfo
  }
}
    ${ServiceCategoryInfoFragmentDoc}`;
export const useServiceCategoryQuery = <
      TData = ServiceCategoryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ServiceCategoryQueryVariables,
      options?: UseQueryOptions<ServiceCategoryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ServiceCategoryQuery, TError, TData>(
      ['ServiceCategory', variables],
      fetcher<ServiceCategoryQuery, ServiceCategoryQueryVariables>(client, ServiceCategoryDocument, variables, headers),
      options
    );

useServiceCategoryQuery.getKey = (variables: ServiceCategoryQueryVariables) => ['ServiceCategory', variables];
;

useServiceCategoryQuery.fetcher = (client: GraphQLClient, variables: ServiceCategoryQueryVariables, headers?: RequestInit['headers']) => fetcher<ServiceCategoryQuery, ServiceCategoryQueryVariables>(client, ServiceCategoryDocument, variables, headers);
export const AddServiceCategoryDocument = `
    mutation AddServiceCategory($input: AddServiceCategoryInputType) {
  addServiceCategory(input: $input) {
    ...ServiceCategoryInfo
  }
}
    ${ServiceCategoryInfoFragmentDoc}`;
export const useAddServiceCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddServiceCategoryMutation, TError, AddServiceCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddServiceCategoryMutation, TError, AddServiceCategoryMutationVariables, TContext>(
      ['AddServiceCategory'],
      (variables?: AddServiceCategoryMutationVariables) => fetcher<AddServiceCategoryMutation, AddServiceCategoryMutationVariables>(client, AddServiceCategoryDocument, variables, headers)(),
      options
    );
useAddServiceCategoryMutation.fetcher = (client: GraphQLClient, variables?: AddServiceCategoryMutationVariables, headers?: RequestInit['headers']) => fetcher<AddServiceCategoryMutation, AddServiceCategoryMutationVariables>(client, AddServiceCategoryDocument, variables, headers);
export const UpdateServiceCategoryDocument = `
    mutation UpdateServiceCategory($input: UpdateServiceCategoryInputType) {
  updateServiceCategory(input: $input) {
    ...ServiceCategoryInfo
  }
}
    ${ServiceCategoryInfoFragmentDoc}`;
export const useUpdateServiceCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateServiceCategoryMutation, TError, UpdateServiceCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateServiceCategoryMutation, TError, UpdateServiceCategoryMutationVariables, TContext>(
      ['UpdateServiceCategory'],
      (variables?: UpdateServiceCategoryMutationVariables) => fetcher<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables>(client, UpdateServiceCategoryDocument, variables, headers)(),
      options
    );
useUpdateServiceCategoryMutation.fetcher = (client: GraphQLClient, variables?: UpdateServiceCategoryMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables>(client, UpdateServiceCategoryDocument, variables, headers);
export const DeleteServiceCategoryDocument = `
    mutation DeleteServiceCategory($id: String!) {
  deleteServiceCategory(id: $id)
}
    `;
export const useDeleteServiceCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteServiceCategoryMutation, TError, DeleteServiceCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteServiceCategoryMutation, TError, DeleteServiceCategoryMutationVariables, TContext>(
      ['DeleteServiceCategory'],
      (variables?: DeleteServiceCategoryMutationVariables) => fetcher<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables>(client, DeleteServiceCategoryDocument, variables, headers)(),
      options
    );
useDeleteServiceCategoryMutation.fetcher = (client: GraphQLClient, variables: DeleteServiceCategoryMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables>(client, DeleteServiceCategoryDocument, variables, headers);
export const ServicesDocument = `
    query Services($input: ServicesInputType) {
  services(input: $input) {
    data {
      ...ServiceInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ServiceInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useServicesQuery = <
      TData = ServicesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ServicesQueryVariables,
      options?: UseQueryOptions<ServicesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ServicesQuery, TError, TData>(
      variables === undefined ? ['Services'] : ['Services', variables],
      fetcher<ServicesQuery, ServicesQueryVariables>(client, ServicesDocument, variables, headers),
      options
    );

useServicesQuery.getKey = (variables?: ServicesQueryVariables) => variables === undefined ? ['Services'] : ['Services', variables];
;

useServicesQuery.fetcher = (client: GraphQLClient, variables?: ServicesQueryVariables, headers?: RequestInit['headers']) => fetcher<ServicesQuery, ServicesQueryVariables>(client, ServicesDocument, variables, headers);
export const ServicesDashboardDocument = `
    query ServicesDashboard($input: ServicesInputType) {
  servicesDashboard(input: $input) {
    data {
      ...ServiceDashboardInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${ServiceDashboardInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useServicesDashboardQuery = <
      TData = ServicesDashboardQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ServicesDashboardQueryVariables,
      options?: UseQueryOptions<ServicesDashboardQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ServicesDashboardQuery, TError, TData>(
      variables === undefined ? ['ServicesDashboard'] : ['ServicesDashboard', variables],
      fetcher<ServicesDashboardQuery, ServicesDashboardQueryVariables>(client, ServicesDashboardDocument, variables, headers),
      options
    );

useServicesDashboardQuery.getKey = (variables?: ServicesDashboardQueryVariables) => variables === undefined ? ['ServicesDashboard'] : ['ServicesDashboard', variables];
;

useServicesDashboardQuery.fetcher = (client: GraphQLClient, variables?: ServicesDashboardQueryVariables, headers?: RequestInit['headers']) => fetcher<ServicesDashboardQuery, ServicesDashboardQueryVariables>(client, ServicesDashboardDocument, variables, headers);
export const ServiceDocument = `
    query Service($id: String!) {
  service(id: $id) {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;
export const useServiceQuery = <
      TData = ServiceQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ServiceQueryVariables,
      options?: UseQueryOptions<ServiceQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ServiceQuery, TError, TData>(
      ['Service', variables],
      fetcher<ServiceQuery, ServiceQueryVariables>(client, ServiceDocument, variables, headers),
      options
    );

useServiceQuery.getKey = (variables: ServiceQueryVariables) => ['Service', variables];
;

useServiceQuery.fetcher = (client: GraphQLClient, variables: ServiceQueryVariables, headers?: RequestInit['headers']) => fetcher<ServiceQuery, ServiceQueryVariables>(client, ServiceDocument, variables, headers);
export const AddServiceDocument = `
    mutation AddService($input: DataServiceInputType) {
  addService(input: $input) {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;
export const useAddServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddServiceMutation, TError, AddServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddServiceMutation, TError, AddServiceMutationVariables, TContext>(
      ['AddService'],
      (variables?: AddServiceMutationVariables) => fetcher<AddServiceMutation, AddServiceMutationVariables>(client, AddServiceDocument, variables, headers)(),
      options
    );
useAddServiceMutation.fetcher = (client: GraphQLClient, variables?: AddServiceMutationVariables, headers?: RequestInit['headers']) => fetcher<AddServiceMutation, AddServiceMutationVariables>(client, AddServiceDocument, variables, headers);
export const UpdateServiceDocument = `
    mutation UpdateService($input: UpdateServiceInputType) {
  updateService(input: $input) {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;
export const useUpdateServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateServiceMutation, TError, UpdateServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateServiceMutation, TError, UpdateServiceMutationVariables, TContext>(
      ['UpdateService'],
      (variables?: UpdateServiceMutationVariables) => fetcher<UpdateServiceMutation, UpdateServiceMutationVariables>(client, UpdateServiceDocument, variables, headers)(),
      options
    );
useUpdateServiceMutation.fetcher = (client: GraphQLClient, variables?: UpdateServiceMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateServiceMutation, UpdateServiceMutationVariables>(client, UpdateServiceDocument, variables, headers);
export const DeleteServiceDocument = `
    mutation DeleteService($id: String!) {
  deleteService(id: $id)
}
    `;
export const useDeleteServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteServiceMutation, TError, DeleteServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteServiceMutation, TError, DeleteServiceMutationVariables, TContext>(
      ['DeleteService'],
      (variables?: DeleteServiceMutationVariables) => fetcher<DeleteServiceMutation, DeleteServiceMutationVariables>(client, DeleteServiceDocument, variables, headers)(),
      options
    );
useDeleteServiceMutation.fetcher = (client: GraphQLClient, variables: DeleteServiceMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteServiceMutation, DeleteServiceMutationVariables>(client, DeleteServiceDocument, variables, headers);
export const SettingDocument = `
    query Setting {
  setting {
    ...SettingInfo
  }
}
    ${SettingInfoFragmentDoc}`;
export const useSettingQuery = <
      TData = SettingQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SettingQueryVariables,
      options?: UseQueryOptions<SettingQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SettingQuery, TError, TData>(
      variables === undefined ? ['Setting'] : ['Setting', variables],
      fetcher<SettingQuery, SettingQueryVariables>(client, SettingDocument, variables, headers),
      options
    );

useSettingQuery.getKey = (variables?: SettingQueryVariables) => variables === undefined ? ['Setting'] : ['Setting', variables];
;

useSettingQuery.fetcher = (client: GraphQLClient, variables?: SettingQueryVariables, headers?: RequestInit['headers']) => fetcher<SettingQuery, SettingQueryVariables>(client, SettingDocument, variables, headers);
export const UpdateSettingDocument = `
    mutation UpdateSetting($input: UpdateSettingInputType) {
  updateSetting(input: $input) {
    ...SettingInfo
  }
}
    ${SettingInfoFragmentDoc}`;
export const useUpdateSettingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateSettingMutation, TError, UpdateSettingMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateSettingMutation, TError, UpdateSettingMutationVariables, TContext>(
      ['UpdateSetting'],
      (variables?: UpdateSettingMutationVariables) => fetcher<UpdateSettingMutation, UpdateSettingMutationVariables>(client, UpdateSettingDocument, variables, headers)(),
      options
    );
useUpdateSettingMutation.fetcher = (client: GraphQLClient, variables?: UpdateSettingMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateSettingMutation, UpdateSettingMutationVariables>(client, UpdateSettingDocument, variables, headers);
export const StyleContentsDocument = `
    query StyleContents {
  styleContents {
    ...StyleContentInfo
  }
}
    ${StyleContentInfoFragmentDoc}`;
export const useStyleContentsQuery = <
      TData = StyleContentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: StyleContentsQueryVariables,
      options?: UseQueryOptions<StyleContentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StyleContentsQuery, TError, TData>(
      variables === undefined ? ['StyleContents'] : ['StyleContents', variables],
      fetcher<StyleContentsQuery, StyleContentsQueryVariables>(client, StyleContentsDocument, variables, headers),
      options
    );

useStyleContentsQuery.getKey = (variables?: StyleContentsQueryVariables) => variables === undefined ? ['StyleContents'] : ['StyleContents', variables];
;

useStyleContentsQuery.fetcher = (client: GraphQLClient, variables?: StyleContentsQueryVariables, headers?: RequestInit['headers']) => fetcher<StyleContentsQuery, StyleContentsQueryVariables>(client, StyleContentsDocument, variables, headers);
export const UpdateStyleContentDocument = `
    mutation UpdateStyleContent($input: UpdateStyleContentInputType) {
  updateStyleContent(input: $input) {
    ...StyleContentInfo
  }
}
    ${StyleContentInfoFragmentDoc}`;
export const useUpdateStyleContentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateStyleContentMutation, TError, UpdateStyleContentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateStyleContentMutation, TError, UpdateStyleContentMutationVariables, TContext>(
      ['UpdateStyleContent'],
      (variables?: UpdateStyleContentMutationVariables) => fetcher<UpdateStyleContentMutation, UpdateStyleContentMutationVariables>(client, UpdateStyleContentDocument, variables, headers)(),
      options
    );
useUpdateStyleContentMutation.fetcher = (client: GraphQLClient, variables?: UpdateStyleContentMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateStyleContentMutation, UpdateStyleContentMutationVariables>(client, UpdateStyleContentDocument, variables, headers);
export const DeleteStyleContentDocument = `
    mutation DeleteStyleContent($id: ID!) {
  deleteStyleContent(id: $id)
}
    `;
export const useDeleteStyleContentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteStyleContentMutation, TError, DeleteStyleContentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteStyleContentMutation, TError, DeleteStyleContentMutationVariables, TContext>(
      ['DeleteStyleContent'],
      (variables?: DeleteStyleContentMutationVariables) => fetcher<DeleteStyleContentMutation, DeleteStyleContentMutationVariables>(client, DeleteStyleContentDocument, variables, headers)(),
      options
    );
useDeleteStyleContentMutation.fetcher = (client: GraphQLClient, variables: DeleteStyleContentMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteStyleContentMutation, DeleteStyleContentMutationVariables>(client, DeleteStyleContentDocument, variables, headers);
export const TeamsDocument = `
    query Teams {
  teams {
    ...TeamInfo
  }
}
    ${TeamInfoFragmentDoc}`;
export const useTeamsQuery = <
      TData = TeamsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: TeamsQueryVariables,
      options?: UseQueryOptions<TeamsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<TeamsQuery, TError, TData>(
      variables === undefined ? ['Teams'] : ['Teams', variables],
      fetcher<TeamsQuery, TeamsQueryVariables>(client, TeamsDocument, variables, headers),
      options
    );

useTeamsQuery.getKey = (variables?: TeamsQueryVariables) => variables === undefined ? ['Teams'] : ['Teams', variables];
;

useTeamsQuery.fetcher = (client: GraphQLClient, variables?: TeamsQueryVariables, headers?: RequestInit['headers']) => fetcher<TeamsQuery, TeamsQueryVariables>(client, TeamsDocument, variables, headers);
export const TeamDocument = `
    query Team($id: String!) {
  team(id: $id) {
    ...TeamInfo
  }
}
    ${TeamInfoFragmentDoc}`;
export const useTeamQuery = <
      TData = TeamQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: TeamQueryVariables,
      options?: UseQueryOptions<TeamQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<TeamQuery, TError, TData>(
      ['Team', variables],
      fetcher<TeamQuery, TeamQueryVariables>(client, TeamDocument, variables, headers),
      options
    );

useTeamQuery.getKey = (variables: TeamQueryVariables) => ['Team', variables];
;

useTeamQuery.fetcher = (client: GraphQLClient, variables: TeamQueryVariables, headers?: RequestInit['headers']) => fetcher<TeamQuery, TeamQueryVariables>(client, TeamDocument, variables, headers);
export const TeamDefaultDocument = `
    query TeamDefault {
  teamDefault {
    ...TeamInfo
  }
}
    ${TeamInfoFragmentDoc}`;
export const useTeamDefaultQuery = <
      TData = TeamDefaultQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: TeamDefaultQueryVariables,
      options?: UseQueryOptions<TeamDefaultQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<TeamDefaultQuery, TError, TData>(
      variables === undefined ? ['TeamDefault'] : ['TeamDefault', variables],
      fetcher<TeamDefaultQuery, TeamDefaultQueryVariables>(client, TeamDefaultDocument, variables, headers),
      options
    );

useTeamDefaultQuery.getKey = (variables?: TeamDefaultQueryVariables) => variables === undefined ? ['TeamDefault'] : ['TeamDefault', variables];
;

useTeamDefaultQuery.fetcher = (client: GraphQLClient, variables?: TeamDefaultQueryVariables, headers?: RequestInit['headers']) => fetcher<TeamDefaultQuery, TeamDefaultQueryVariables>(client, TeamDefaultDocument, variables, headers);
export const AddTeamDocument = `
    mutation AddTeam($input: DataTeamInputType) {
  addTeam(input: $input) {
    ...TeamInfo
  }
}
    ${TeamInfoFragmentDoc}`;
export const useAddTeamMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddTeamMutation, TError, AddTeamMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddTeamMutation, TError, AddTeamMutationVariables, TContext>(
      ['AddTeam'],
      (variables?: AddTeamMutationVariables) => fetcher<AddTeamMutation, AddTeamMutationVariables>(client, AddTeamDocument, variables, headers)(),
      options
    );
useAddTeamMutation.fetcher = (client: GraphQLClient, variables?: AddTeamMutationVariables, headers?: RequestInit['headers']) => fetcher<AddTeamMutation, AddTeamMutationVariables>(client, AddTeamDocument, variables, headers);
export const UpdateTeamDocument = `
    mutation UpdateTeam($input: UpdateTeamInputType) {
  updateTeam(input: $input) {
    ...TeamInfo
  }
}
    ${TeamInfoFragmentDoc}`;
export const useUpdateTeamMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateTeamMutation, TError, UpdateTeamMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateTeamMutation, TError, UpdateTeamMutationVariables, TContext>(
      ['UpdateTeam'],
      (variables?: UpdateTeamMutationVariables) => fetcher<UpdateTeamMutation, UpdateTeamMutationVariables>(client, UpdateTeamDocument, variables, headers)(),
      options
    );
useUpdateTeamMutation.fetcher = (client: GraphQLClient, variables?: UpdateTeamMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateTeamMutation, UpdateTeamMutationVariables>(client, UpdateTeamDocument, variables, headers);
export const DeleteTeamDocument = `
    mutation DeleteTeam($teamId: ID!) {
  deleteTeam(teamId: $teamId)
}
    `;
export const useDeleteTeamMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteTeamMutation, TError, DeleteTeamMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteTeamMutation, TError, DeleteTeamMutationVariables, TContext>(
      ['DeleteTeam'],
      (variables?: DeleteTeamMutationVariables) => fetcher<DeleteTeamMutation, DeleteTeamMutationVariables>(client, DeleteTeamDocument, variables, headers)(),
      options
    );
useDeleteTeamMutation.fetcher = (client: GraphQLClient, variables: DeleteTeamMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteTeamMutation, DeleteTeamMutationVariables>(client, DeleteTeamDocument, variables, headers);
export const ChangeDefaultTeamDocument = `
    mutation ChangeDefaultTeam($teamId: ID) {
  changeDefaultTeam(teamId: $teamId) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useChangeDefaultTeamMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeDefaultTeamMutation, TError, ChangeDefaultTeamMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeDefaultTeamMutation, TError, ChangeDefaultTeamMutationVariables, TContext>(
      ['ChangeDefaultTeam'],
      (variables?: ChangeDefaultTeamMutationVariables) => fetcher<ChangeDefaultTeamMutation, ChangeDefaultTeamMutationVariables>(client, ChangeDefaultTeamDocument, variables, headers)(),
      options
    );
useChangeDefaultTeamMutation.fetcher = (client: GraphQLClient, variables?: ChangeDefaultTeamMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeDefaultTeamMutation, ChangeDefaultTeamMutationVariables>(client, ChangeDefaultTeamDocument, variables, headers);
export const UsersDocument = `
    query Users($input: UsersInputType) {
  users(input: $input) {
    data {
      ...UserInfo
    }
    pagination {
      ...PaginationInfo
    }
  }
}
    ${UserInfoFragmentDoc}
${PaginationInfoFragmentDoc}`;
export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UsersQueryVariables,
      options?: UseQueryOptions<UsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UsersQuery, TError, TData>(
      variables === undefined ? ['Users'] : ['Users', variables],
      fetcher<UsersQuery, UsersQueryVariables>(client, UsersDocument, variables, headers),
      options
    );

useUsersQuery.getKey = (variables?: UsersQueryVariables) => variables === undefined ? ['Users'] : ['Users', variables];
;

useUsersQuery.fetcher = (client: GraphQLClient, variables?: UsersQueryVariables, headers?: RequestInit['headers']) => fetcher<UsersQuery, UsersQueryVariables>(client, UsersDocument, variables, headers);
export const AddCustomerDocument = `
    mutation AddCustomer($input: AddCustomerInputType) {
  addCustomer(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useAddCustomerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddCustomerMutation, TError, AddCustomerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddCustomerMutation, TError, AddCustomerMutationVariables, TContext>(
      ['AddCustomer'],
      (variables?: AddCustomerMutationVariables) => fetcher<AddCustomerMutation, AddCustomerMutationVariables>(client, AddCustomerDocument, variables, headers)(),
      options
    );
useAddCustomerMutation.fetcher = (client: GraphQLClient, variables?: AddCustomerMutationVariables, headers?: RequestInit['headers']) => fetcher<AddCustomerMutation, AddCustomerMutationVariables>(client, AddCustomerDocument, variables, headers);
export const AddMemberDocument = `
    mutation AddMember($input: AddMemberInputType) {
  addMember(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useAddMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddMemberMutation, TError, AddMemberMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddMemberMutation, TError, AddMemberMutationVariables, TContext>(
      ['AddMember'],
      (variables?: AddMemberMutationVariables) => fetcher<AddMemberMutation, AddMemberMutationVariables>(client, AddMemberDocument, variables, headers)(),
      options
    );
useAddMemberMutation.fetcher = (client: GraphQLClient, variables?: AddMemberMutationVariables, headers?: RequestInit['headers']) => fetcher<AddMemberMutation, AddMemberMutationVariables>(client, AddMemberDocument, variables, headers);
export const DeleteMemberDocument = `
    mutation DeleteMember($memberId: ID!) {
  deleteMember(memberId: $memberId)
}
    `;
export const useDeleteMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteMemberMutation, TError, DeleteMemberMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteMemberMutation, TError, DeleteMemberMutationVariables, TContext>(
      ['DeleteMember'],
      (variables?: DeleteMemberMutationVariables) => fetcher<DeleteMemberMutation, DeleteMemberMutationVariables>(client, DeleteMemberDocument, variables, headers)(),
      options
    );
useDeleteMemberMutation.fetcher = (client: GraphQLClient, variables: DeleteMemberMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteMemberMutation, DeleteMemberMutationVariables>(client, DeleteMemberDocument, variables, headers);
export const UpdateUserDocument = `
    mutation UpdateUser($input: UpdateUserInputType) {
  updateUser(input: $input) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
useUpdateUserMutation.fetcher = (client: GraphQLClient, variables?: UpdateUserMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers);
export const ChangeEmailDocument = `
    mutation ChangeEmail($input: ChangeEmailUserInputType) {
  changeEmail(input: $input)
}
    `;
export const useChangeEmailMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeEmailMutation, TError, ChangeEmailMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeEmailMutation, TError, ChangeEmailMutationVariables, TContext>(
      ['ChangeEmail'],
      (variables?: ChangeEmailMutationVariables) => fetcher<ChangeEmailMutation, ChangeEmailMutationVariables>(client, ChangeEmailDocument, variables, headers)(),
      options
    );
useChangeEmailMutation.fetcher = (client: GraphQLClient, variables?: ChangeEmailMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeEmailMutation, ChangeEmailMutationVariables>(client, ChangeEmailDocument, variables, headers);
export const ChangePasswordDocument = `
    mutation ChangePassword($input: ChangePasswordUserInputType) {
  changePassword(input: $input)
}
    `;
export const useChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
      ['ChangePassword'],
      (variables?: ChangePasswordMutationVariables) => fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers)(),
      options
    );
useChangePasswordMutation.fetcher = (client: GraphQLClient, variables?: ChangePasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers);
export const WorkspaceDocument = `
    query Workspace($id: String) {
  workspace {
    ...WorkspaceInfo
  }
}
    ${WorkspaceInfoFragmentDoc}`;
export const useWorkspaceQuery = <
      TData = WorkspaceQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: WorkspaceQueryVariables,
      options?: UseQueryOptions<WorkspaceQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<WorkspaceQuery, TError, TData>(
      variables === undefined ? ['Workspace'] : ['Workspace', variables],
      fetcher<WorkspaceQuery, WorkspaceQueryVariables>(client, WorkspaceDocument, variables, headers),
      options
    );

useWorkspaceQuery.getKey = (variables?: WorkspaceQueryVariables) => variables === undefined ? ['Workspace'] : ['Workspace', variables];
;

useWorkspaceQuery.fetcher = (client: GraphQLClient, variables?: WorkspaceQueryVariables, headers?: RequestInit['headers']) => fetcher<WorkspaceQuery, WorkspaceQueryVariables>(client, WorkspaceDocument, variables, headers);
export const UpdateWorkspaceDocument = `
    mutation UpdateWorkspace($input: UpdateWorkspaceInputType) {
  updateWorkspace(input: $input) {
    ...WorkspaceInfo
  }
}
    ${WorkspaceInfoFragmentDoc}`;
export const useUpdateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>(
      ['UpdateWorkspace'],
      (variables?: UpdateWorkspaceMutationVariables) => fetcher<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(client, UpdateWorkspaceDocument, variables, headers)(),
      options
    );
useUpdateWorkspaceMutation.fetcher = (client: GraphQLClient, variables?: UpdateWorkspaceMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(client, UpdateWorkspaceDocument, variables, headers);
export const UpdateWorkspaceAdminDocument = `
    mutation UpdateWorkspaceAdmin($input: UpdateWorkspaceAdminInputType) {
  updateWorkspaceAdmin(input: $input) {
    ...WorkspaceInfo
  }
}
    ${WorkspaceInfoFragmentDoc}`;
export const useUpdateWorkspaceAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateWorkspaceAdminMutation, TError, UpdateWorkspaceAdminMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateWorkspaceAdminMutation, TError, UpdateWorkspaceAdminMutationVariables, TContext>(
      ['UpdateWorkspaceAdmin'],
      (variables?: UpdateWorkspaceAdminMutationVariables) => fetcher<UpdateWorkspaceAdminMutation, UpdateWorkspaceAdminMutationVariables>(client, UpdateWorkspaceAdminDocument, variables, headers)(),
      options
    );
useUpdateWorkspaceAdminMutation.fetcher = (client: GraphQLClient, variables?: UpdateWorkspaceAdminMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateWorkspaceAdminMutation, UpdateWorkspaceAdminMutationVariables>(client, UpdateWorkspaceAdminDocument, variables, headers);
export const PayRequestAiContentDocument = `
    mutation PayRequestAiContent($token: Int, $content: String) {
  payRequestAiContent(token: $token, content: $content)
}
    `;
export const usePayRequestAiContentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PayRequestAiContentMutation, TError, PayRequestAiContentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<PayRequestAiContentMutation, TError, PayRequestAiContentMutationVariables, TContext>(
      ['PayRequestAiContent'],
      (variables?: PayRequestAiContentMutationVariables) => fetcher<PayRequestAiContentMutation, PayRequestAiContentMutationVariables>(client, PayRequestAiContentDocument, variables, headers)(),
      options
    );
usePayRequestAiContentMutation.fetcher = (client: GraphQLClient, variables?: PayRequestAiContentMutationVariables, headers?: RequestInit['headers']) => fetcher<PayRequestAiContentMutation, PayRequestAiContentMutationVariables>(client, PayRequestAiContentDocument, variables, headers);
export const ChangeExpiredTimeWorkspaceDocument = `
    mutation ChangeExpiredTimeWorkspace($input: ChangeExpiredTimeWorkspaceInputType) {
  changeExpiredTimeWorkspace(input: $input) {
    ...WorkspaceInfo
  }
}
    ${WorkspaceInfoFragmentDoc}`;
export const useChangeExpiredTimeWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeExpiredTimeWorkspaceMutation, TError, ChangeExpiredTimeWorkspaceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeExpiredTimeWorkspaceMutation, TError, ChangeExpiredTimeWorkspaceMutationVariables, TContext>(
      ['ChangeExpiredTimeWorkspace'],
      (variables?: ChangeExpiredTimeWorkspaceMutationVariables) => fetcher<ChangeExpiredTimeWorkspaceMutation, ChangeExpiredTimeWorkspaceMutationVariables>(client, ChangeExpiredTimeWorkspaceDocument, variables, headers)(),
      options
    );
useChangeExpiredTimeWorkspaceMutation.fetcher = (client: GraphQLClient, variables?: ChangeExpiredTimeWorkspaceMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeExpiredTimeWorkspaceMutation, ChangeExpiredTimeWorkspaceMutationVariables>(client, ChangeExpiredTimeWorkspaceDocument, variables, headers);
export const PayContentAiDocument = `
    mutation PayContentAI($content: String) {
  payContentAI(content: $content)
}
    `;
export const usePayContentAiMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PayContentAiMutation, TError, PayContentAiMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<PayContentAiMutation, TError, PayContentAiMutationVariables, TContext>(
      ['PayContentAI'],
      (variables?: PayContentAiMutationVariables) => fetcher<PayContentAiMutation, PayContentAiMutationVariables>(client, PayContentAiDocument, variables, headers)(),
      options
    );
usePayContentAiMutation.fetcher = (client: GraphQLClient, variables?: PayContentAiMutationVariables, headers?: RequestInit['headers']) => fetcher<PayContentAiMutation, PayContentAiMutationVariables>(client, PayContentAiDocument, variables, headers);
export const UpdateTimeUseGpt4Document = `
    mutation UpdateTimeUseGpt4($workspacePackageId: ID!) {
  updateTimeUseGpt4(workspacePackageId: $workspacePackageId) {
    ...WorkspacePackageInfo
  }
}
    ${WorkspacePackageInfoFragmentDoc}`;
export const useUpdateTimeUseGpt4Mutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateTimeUseGpt4Mutation, TError, UpdateTimeUseGpt4MutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateTimeUseGpt4Mutation, TError, UpdateTimeUseGpt4MutationVariables, TContext>(
      ['UpdateTimeUseGpt4'],
      (variables?: UpdateTimeUseGpt4MutationVariables) => fetcher<UpdateTimeUseGpt4Mutation, UpdateTimeUseGpt4MutationVariables>(client, UpdateTimeUseGpt4Document, variables, headers)(),
      options
    );
useUpdateTimeUseGpt4Mutation.fetcher = (client: GraphQLClient, variables: UpdateTimeUseGpt4MutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateTimeUseGpt4Mutation, UpdateTimeUseGpt4MutationVariables>(client, UpdateTimeUseGpt4Document, variables, headers);
import {StackScreenProps} from '@react-navigation/stack';
import {TPost} from './TPost';

export type RootStackParamList = {
  HomeScreen: undefined;
  PostScreen: {post: TPost};
  EditPostScreen: {post: TPost};
  NewPostScreen: undefined;
};

export type RootStackScreenProps<ROUTE_NAME extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, ROUTE_NAME>;

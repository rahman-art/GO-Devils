export interface helpData {
  query_id: number;
  query_title: string;
  created_by: number;
  created_on: string;
  status: string;
  action_by: number;
  action_on: null | string;
  action_by_name: null | string;
}

export interface queriesMessageData {
  query_id: number;
  query_title: string;
  created_by: number;
  created_on: string;
  status: string;
  action_by: number;
  action_on: null | string;
  action_by_name: null | string;
}


export interface replyMessageData {
  message_id: number;
  message: string;
  role: string;
  name: string;
  is_read_by_agent: boolean;
  read_by: null |string;
  read_on_by_agent: null | string;
  read_on: null | string;
  created_by: number;
  created_on: string;
  query_id: number;
}

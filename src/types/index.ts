export interface Users {
  id: number;            
  email: string;          
  name: string;           
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}

export interface Posts {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface CreateUser {
  name: string; 
  email: string; 
  gender: string; 
  status: string
}

export interface UpdateUser {
  name: string; 
  email: string; 
  gender: string; 
  status: string
}

export interface CreatePost {
  title: string;
  body: string;
}

export interface UpdatePost {
  id: number;
  user_id: number;
  title: string;
  body: string;
}


  
// API base URL - adjust this to match your backend
const API_BASE_URL = 'http://localhost:8000'; // or your server URL

// Article types
export interface Article {
  id?: number;
  nom: string;
  prix: number;
  categorie: 'Entree' | 'Plat' | 'Dessert' | 'Boisson';
  description: string;
  disponible: boolean;
  commandeArticles: any[];
}

// Client types
export interface Client {
  id?: number;
  nom: string;
  prenom: string;
  numeroRue: string;
  nomRue: string;
  ville: string;
  codePostal: string;
  telephone: string;
  commandes: any[];
}

// Commande types
export interface Commande {
  id?: number;
  idArticles: number[];
  idClient: number;
  type: 'SurPlace' | 'AEmporter' | 'Livraison';
  EstLivree?: boolean;
}

// API functions for articles
export const articlesApi = {
  // Get all articles
  getAll: async (): Promise<Article[]> => {
    const response = await fetch(`${API_BASE_URL}/articles/`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
  },

  // Get article by ID
  getById: async (id: number): Promise<Article> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  // Create new article
  create: async (article: Omit<Article, 'id'>): Promise<Article> => {
    const response = await fetch(`${API_BASE_URL}/articles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) throw new Error('Failed to create article');
    return response.json();
  },

  // Update article
  update: async (id: number, article: Omit<Article, 'id'>): Promise<Article> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) throw new Error('Failed to update article');
    return response.json();
  },

  // Delete article
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete article');
  },
};

// API functions for clients
export const clientsApi = {
  // Get all clients
  getAll: async (): Promise<Client[]> => {
    const response = await fetch(`${API_BASE_URL}/clients/`);
    if (!response.ok) throw new Error('Failed to fetch clients');
    return response.json();
  },

  // Get client by ID
  getById: async (id: number): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`);
    if (!response.ok) throw new Error('Failed to fetch client');
    return response.json();
  },

  // Create new client
  create: async (client: Omit<Client, 'id'>): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    if (!response.ok) throw new Error('Failed to create client');
    return response.json();
  },

  // Update client
  update: async (id: number, client: Omit<Client, 'id'>): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    if (!response.ok) throw new Error('Failed to update client');
    return response.json();
  },

  // Delete client
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete client');
  },
};

// API functions for commandes
export const commandesApi = {
  // Get all commandes
  getAll: async (): Promise<Commande[]> => {
    const response = await fetch(`${API_BASE_URL}/commandes/`);
    if (!response.ok) throw new Error('Failed to fetch commandes');
    return response.json();
  },

  // Get commande by ID
  getById: async (id: number): Promise<Commande> => {
    const response = await fetch(`${API_BASE_URL}/commandes/${id}`);
    if (!response.ok) throw new Error('Failed to fetch commande');
    return response.json();
  },

  // Create new commande
  create: async (commande: Omit<Commande, 'id'>): Promise<Commande> => {
    const response = await fetch(`${API_BASE_URL}/commandes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commande),
    });
    if (!response.ok) throw new Error('Failed to create commande');
    return response.json();
  },

  // Get non-delivered commandes
  getNonLivrees: async (): Promise<Commande[]> => {
    const response = await fetch(`${API_BASE_URL}/commandes/non-livree`);
    if (!response.ok) throw new Error('Failed to fetch non-delivered commandes');
    return response.json();
  },

  // Mark commande as delivered
  markAsDelivered: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/commandes/${id}/livree`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to mark commande as delivered');
  },

  // Delete commande
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/commandes/${id}/supprimer`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete commande');
  },
};
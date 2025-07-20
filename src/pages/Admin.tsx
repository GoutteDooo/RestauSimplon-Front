import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Users, ShoppingBag, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { articlesApi, clientsApi, commandesApi, type Article, type Client, type Commande } from "@/lib/api";

const Admin = () => {
  // State for articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState({
    nom: "",
    description: "",
    prix: 0,
    categorie: "Entree" as Article['categorie'],
    disponible: true,
    commandeArticles: []
  });
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // State for clients
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({
    nom: "",
    prenom: "",
    numeroRue: "",
    nomRue: "",
    ville: "",
    codePostal: "",
    telephone: "",
    commandes: []
  });

  // State for commandes
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [nonLivreeCommandes, setNonLivreeCommandes] = useState<Commande[]>([]);

  const { toast } = useToast();

  // Load data on component mount
  useEffect(() => {
    loadArticles();
    loadClients();
    loadCommandes();
    loadNonLivreeCommandes();
  }, []);

  // Article functions
  const loadArticles = async () => {
    try {
      const data = await articlesApi.getAll();
      setArticles(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive"
      });
    }
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await articlesApi.create(newArticle);
      toast({
        title: "Article ajouté!",
        description: `${newArticle.nom} a été ajouté au menu.`,
      });
      setNewArticle({
        nom: "",
        description: "",
        prix: 0,
        categorie: "Entree",
        disponible: true,
        commandeArticles: []
      });
      loadArticles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'article",
        variant: "destructive"
      });
    }
  };

  const handleEditArticle = async (article: Article) => {
    if (!editingArticle || !article.id) return;
    try {
      await articlesApi.update(article.id, {
        nom: article.nom,
        description: article.description,
        prix: article.prix,
        categorie: article.categorie,
        disponible: article.disponible,
        commandeArticles: []
      });
      toast({
        title: "Article modifié!",
        description: `${article.nom} a été mis à jour.`,
      });
      setEditingArticle(null);
      loadArticles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'article",
        variant: "destructive"
      });
    }
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      await articlesApi.delete(id);
      toast({
        title: "Article supprimé!",
        description: "L'article a été supprimé du menu.",
      });
      loadArticles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive"
      });
    }
  };

  // Client functions
  const loadClients = async () => {
    try {
      const data = await clientsApi.getAll();
      setClients(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load clients",
        variant: "destructive"
      });
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await clientsApi.create(newClient);
      toast({
        title: "Client ajouté!",
        description: `${newClient.prenom} ${newClient.nom} a été ajouté.`,
      });
      setNewClient({
        nom: "",
        prenom: "",
        numeroRue: "",
        nomRue: "",
        ville: "",
        codePostal: "",
        telephone: "",
        commandes: []
      });
      loadClients();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le client",
        variant: "destructive"
      });
    }
  };

  // Commande functions
  const loadCommandes = async () => {
    try {
      const data = await commandesApi.getAll();
      setCommandes(data);
      console.log("Commandes loaded:", data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load commandes",
        variant: "destructive"
      });
    }
  };

  const loadNonLivreeCommandes = async () => {
    try {
      const data = await commandesApi.getNonLivrees();
      setNonLivreeCommandes(data);
      console.log("Non-livrees:", data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pending orders",
        variant: "destructive"
      });
    }
  };

  const handleMarkAsDelivered = async (id: number) => {
    try {
      await commandesApi.markAsDelivered(id);
      toast({
        title: "Commande livrée!",
        description: "La commande a été marquée comme livrée.",
      });
      loadNonLivreeCommandes();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de marquer la commande comme livrée",
        variant: "destructive"
      });
    }
  };

  const statsCards = [
    {
      title: "Total Articles",
      value: articles.length.toString(),
      icon: ShoppingBag,
      trend: "+12%",
      color: "text-primary"
    },
    {
      title: "Total Clients",
      value: clients.length.toString(),
      icon: Users,
      trend: "+8%",
      color: "text-golden"
    },
    {
      title: "Commandes en Attente",
      value: nonLivreeCommandes.length.toString(),
      icon: DollarSign,
      trend: "+15%",
      color: "text-deep-orange"
    },
    {
      title: "Total Commandes",
      value: commandes.length.toString(),
      icon: TrendingUp,
      trend: "+3%",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your restaurant efficiently</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-slide-up">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => (
                <Card key={index} className="bg-gradient-card shadow-elegant hover:shadow-warm transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.trend}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Orders */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle>Commandes en Attente</CardTitle>
                <CardDescription>Commandes non livrées</CardDescription>
              </CardHeader>
              <CardContent>
                {nonLivreeCommandes.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune commande en attente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {nonLivreeCommandes && nonLivreeCommandes.map((commande) => (
                      <div key={commande.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                        <div>
                          <p className="font-medium">Commande #{commande.id}</p>
                          <p className="text-sm text-muted-foreground">
                            Client: {commande.clientId} |
                            Type: {commande.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Articles:
                          </p>
                          <ul className="text-sm text-muted-foreground ml-4 list-disc">
                            {commande.articles.map((article) => (
                              <li key={article.idArticle}>
                                {article.nomArticle} — {article.quantite} × {article.prixArticle}€
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm text-muted-foreground">
                            Total: {commande.prixTotal}€
                          </p>
                        </div>
                        <Button
                          onClick={() => commande.id && handleMarkAsDelivered(commande.id)}
                          size="sm"
                          variant="outline"
                        >
                          Marquer comme livrée
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="animate-slide-up space-y-6">
            {/* Add new article form */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle>Ajouter un Article</CardTitle>
                <CardDescription>Ajoutez de nouveaux plats au menu</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddArticle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom du Plat</Label>
                      <Input
                        id="nom"
                        value={newArticle.nom}
                        onChange={(e) => setNewArticle({...newArticle, nom: e.target.value})}
                        placeholder="Entrez le nom du plat"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prix">Prix (€)</Label>
                      <Input
                        id="prix"
                        type="number"
                        step="0.01"
                        value={newArticle.prix}
                        onChange={(e) => setNewArticle({...newArticle, prix: parseFloat(e.target.value) || 0})}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categorie">Catégorie</Label>
                      <Select value={newArticle.categorie} onValueChange={(value: Article['categorie']) => setNewArticle({...newArticle, categorie: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entree">Entrée</SelectItem>
                          <SelectItem value="Plat">Plat Principal</SelectItem>
                          <SelectItem value="Dessert">Dessert</SelectItem>
                          <SelectItem value="Boisson">Boisson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 flex items-center gap-2">
                      <Checkbox
                        id="disponible"
                        checked={newArticle.disponible}
                        onCheckedChange={(checked) => setNewArticle({...newArticle, disponible: checked as boolean})}
                      />
                      <Label htmlFor="disponible">Disponible</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newArticle.description}
                      onChange={(e) => setNewArticle({...newArticle, description: e.target.value})}
                      placeholder="Décrivez ce délicieux plat..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <Button type="submit" variant="primary" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter l'Article
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Articles list */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle>Articles du Menu</CardTitle>
                <CardDescription>Gérez vos articles existants</CardDescription>
              </CardHeader>
              <CardContent>
                {articles.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucun article dans le menu</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{article.nom}</h3>
                            <Badge variant={article.disponible ? "default" : "secondary"}>
                              {article.disponible ? "Disponible" : "Indisponible"}
                            </Badge>
                            <Badge variant="outline">{article.categorie}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{article.description}</p>
                          <p className="font-bold text-primary">{article.prix}€</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingArticle(article)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => article.id && handleDeleteArticle(article.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="animate-slide-up space-y-6">
            {/* All orders */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle>Toutes les Commandes</CardTitle>
                <CardDescription>Gérez toutes les commandes du restaurant</CardDescription>
              </CardHeader>
              <CardContent>
                {commandes.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune commande trouvée</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {commandes.map((commande) => (
                      <div key={commande.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">Commande #{commande.id}</h3>
                            <Badge variant="outline">{commande.type}</Badge>
                            <Badge variant={commande.estLivree ? "default" : "secondary"}>
                              {commande.estLivree ? "Livrée" : "En attente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Client: {commande.clientId} | Articles: {commande.articles.map((article) => article.nomArticle).join(', ')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total: {commande.prixTotal}€
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {!commande.estLivree && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => commande.id && handleMarkAsDelivered(commande.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Marquer livrée
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => commande.id && commandesApi.delete(commande.id).then(loadCommandes)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="animate-slide-up space-y-6">
            {/* Client Management */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle>Gestion des Clients</CardTitle>
                <CardDescription>Ajoutez et gérez vos clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add new client form */}
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        value={newClient.prenom}
                        onChange={(e) => setNewClient({...newClient, prenom: e.target.value})}
                        placeholder="Prénom du client"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        value={newClient.nom}
                        onChange={(e) => setNewClient({...newClient, nom: e.target.value})}
                        placeholder="Nom du client"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numeroRue">Numéro</Label>
                      <Input
                        id="numeroRue"
                        value={newClient.numeroRue}
                        onChange={(e) => setNewClient({...newClient, numeroRue: e.target.value})}
                        placeholder="123"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="nomRue">Rue</Label>
                      <Input
                        id="nomRue"
                        value={newClient.nomRue}
                        onChange={(e) => setNewClient({...newClient, nomRue: e.target.value})}
                        placeholder="Nom de la rue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="codePostal">Code Postal</Label>
                      <Input
                        id="codePostal"
                        value={newClient.codePostal}
                        onChange={(e) => setNewClient({...newClient, codePostal: e.target.value})}
                        placeholder="75001"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville</Label>
                      <Input
                        id="ville"
                        value={newClient.ville}
                        onChange={(e) => setNewClient({...newClient, ville: e.target.value})}
                        placeholder="Paris"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={newClient.telephone}
                        onChange={(e) => setNewClient({...newClient, telephone: e.target.value})}
                        placeholder="01 23 45 67 89"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" variant="primary" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter le Client
                  </Button>
                </form>

                {/* Clients list */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Clients Existants</h3>
                  {clients.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Aucun client enregistré</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {clients.map((client) => (
                        <div key={client.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                          <div className="flex-1">
                            <h4 className="font-medium">{client.prenom} {client.nom}</h4>
                            <p className="text-sm text-muted-foreground">
                              {client.numeroRue} {client.nomRue}, {client.codePostal} {client.ville}
                            </p>
                            <p className="text-sm text-muted-foreground">{client.telephone}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => client.id && clientsApi.delete(client.id).then(loadClients)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
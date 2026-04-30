import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


/**
 * Utilisation du pattern Singleton pour garantir une seule instance
 */
export class Database {
  private static instance: Database;
  private isConnected: boolean = false;


  private constructor() {}


  /**
   * Récupère l'instance unique de Database (Singleton)
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }


  /**
   * Établit la connexion à MongoDB
   */
  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('Déjà connecté à MongoDB');
      return;
    }

    try {
      const mongoUri = process.env.DB_URI;

      if (!mongoUri) {
        throw new Error('DB_URI est obligatoire dans .env');
      }

      console.log('Tentative de connexion à MongoDB...');
      await mongoose.connect(mongoUri);
      this.isConnected = true;

      console.log('Connexion à MongoDB Atlas réussie');
    } catch (error) {
      console.error('Erreur de connexion à MongoDB:', error);
      process.exit(1);
    }
  }

  /**
   * Ferme la connexion à MongoDB
   */
  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }


    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('Déconnexion de MongoDB réussie');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  }
}

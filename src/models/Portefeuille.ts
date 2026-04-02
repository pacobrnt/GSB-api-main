import mongoose, { Document, Schema } from 'mongoose';

export interface IPortefeuille extends Document {
  visiteur: mongoose.Types.ObjectId;
  praticien: mongoose.Types.ObjectId;
  date_ajout: Date;
  actif: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const portefeuilleSchema = new Schema<IPortefeuille>(
  {
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est requis']
    },
    praticien: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, 'Le praticien est requis']
    },
    date_ajout: {
      type: Date,
      default: Date.now,
      required: [true, 'La date d\'ajout est requise']
    },
    actif: {
      type: Boolean,
      default: true
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index pour éviter les doublons et optimiser les recherches
portefeuilleSchema.index({ visiteur: 1, praticien: 1 }, { unique: true });
portefeuilleSchema.index({ visiteur: 1, actif: 1 });
portefeuilleSchema.index({ praticien: 1, actif: 1 });

export const Portefeuille = mongoose.model<IPortefeuille>('Portefeuille', portefeuilleSchema);

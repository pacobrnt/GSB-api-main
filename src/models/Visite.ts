import mongoose, { Document, Schema } from 'mongoose';

export interface IVisite extends Document {
  date_visite: Date;
  commentaire: string;
  visiteur: mongoose.Types.ObjectId;
  praticien: mongoose.Types.ObjectId;
  motif: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const visiteSchema = new Schema<IVisite>(
  {
    date_visite: {
      type: Date,
      required: [true, 'La date de visite est requise']
    },
    commentaire: {
      type: String,
      trim: true,
      maxlength: [1000, 'Le commentaire ne peut pas dépasser 1000 caractères']
    },
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
    motif: {
      type: Schema.Types.ObjectId,
      ref: 'Motif',
      required: [true, 'Le motif est requis']
    }
  },
  {
    timestamps: true
  }
);

// Index pour optimiser les recherches
visiteSchema.index({ visiteur: 1, date_visite: -1 });
visiteSchema.index({ praticien: 1, date_visite: -1 });
visiteSchema.index({ date_visite: -1 });
visiteSchema.index({ motif: 1 });

export const Visite = mongoose.model<IVisite>('Visite', visiteSchema);

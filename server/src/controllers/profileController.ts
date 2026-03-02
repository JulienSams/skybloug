import { Request, Response } from 'express';
import prisma from '../config/database';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Get first profile or create default
    let profile = await prisma.profile.findFirst();

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: 'Mon Skyblog',
          bio: null,
          age: null,
          location: null,
          photoUrl: null
        }
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, bio, age, location, photoUrl } = req.body;

    // Get existing profile ID or create new
    let existing = await prisma.profile.findFirst();
    const profileId = existing?.id;

    // Upsert profile (update if exists, create if not)
    const profile = await prisma.profile.upsert({
      where: { id: profileId || 'non-existent-id' },
      update: {
        ...(name !== undefined && { name }),
        ...(bio !== undefined && { bio }),
        ...(age !== undefined && { age }),
        ...(location !== undefined && { location }),
        ...(photoUrl !== undefined && { photoUrl })
      },
      create: {
        name: name || 'Mon Skyblog',
        bio,
        age,
        location,
        photoUrl
      }
    });

    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

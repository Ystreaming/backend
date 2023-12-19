import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import http from 'http';
import { gracefulShutdown } from '../index';

jest.mock('../tools/database', () => ({
  connectToDatabase: jest.fn().mockResolvedValue(true)
}));

describe('Middleware de gestion d\'erreurs', () => {
  it('doit retourner 500 et un message d\'erreur lorsqu\'une erreur est levée', async () => {
    const res = await request(app).get('/test/error');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('message', 'Test Error');
  });
});

describe('Démarrage du serveur', () => {
  let mockListen: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    mockListen = jest.spyOn(http.Server.prototype, 'listen').mockImplementation((port, callback) => {
      if (callback) callback();
      return null as unknown as http.Server;
    });
  });

  afterEach(() => {
    mockListen.mockRestore();
  });

  it('devrait démarrer et écouter sur le port spécifié', async () => {
    const port = process.env.PORT || '3000';
    await require('../index');

    expect(mockListen).toHaveBeenCalledWith(port, expect.any(Function));
  });
});

describe('Connexion à la base de données', () => {
  it('devrait se connecter à la base de données', async () => {
    const { connectToDatabase } = require('../tools/database');
    await require('../index');

    expect(connectToDatabase).toHaveBeenCalled();
  });
});

describe('Fermeture gracieuse', () => {
  it('devrait gérer les signaux SIGINT/SIGTERM', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const mockDisconnect = jest.spyOn(mongoose, 'disconnect').mockResolvedValue();

    const fakeSignal = new AbortController().signal;

    await gracefulShutdown(fakeSignal);

    expect(mockDisconnect).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('devrait enregistrer une erreur et quitter avec le code 1 si la déconnexion de la base de données échoue', async () => {
    jest.spyOn(mongoose, 'disconnect').mockRejectedValue(new Error('Échec de la déconnexion'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    const fakeSignal = new AbortController().signal;

    await gracefulShutdown(fakeSignal);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la fermeture des connexions:', expect.any(Error));
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
    jest.restoreAllMocks();
  });
});



/**
 * @jest-environment node
 */

// Importaciones y Mocks necesarios
jest.mock("next/server");
jest.mock("../../models/libros");
jest.mock("../../libs/mongodb");

const mockBookSave = jest.fn();
jest.mock("../../models/libros", () => {
  return jest.fn().mockImplementation(() => {
    return { save: mockBookSave };
  });
});

jest.mock('next/server', () => {
    const mockedJson = jest.fn();
    return {
        NextResponse: {
            json: (...args) => {
                mockedJson(...args);
                return { status: args[0]?.status || 200 };
            },
        },
        __mockedJson: mockedJson
    };
});

const { __mockedJson: mockedJson } = require('next/server');
const { POST } = require('./book/route'); // Ajusta esto según tu estructura
const { connectDB } = require("../../libs/mongodb");
const BOOK = require("../../models/libros");

describe('POST /api/books', () => {
    it('successfully creates a new book', async () => {
      const bookData = {
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        copiesAvailable: 3
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(bookData)
      };

      // Configurar mock para método save del modelo BOOK
      mockBookSave.mockResolvedValue({ _id: 'newBookId', ...bookData });

      // Mocking connectDB
      connectDB.mockResolvedValue();

      const response = await POST(mockRequest);

      // Verificaciones
      expect(mockRequest.json).toHaveBeenCalled();
      expect(connectDB).toHaveBeenCalled();
      expect(mockBookSave).toHaveBeenCalled();
      expect(mockedJson).toHaveBeenCalledWith({
        _id: 'newBookId', 
        ...bookData
      });
    });

    // Aquí puedes agregar más pruebas para casos de error o comportamientos inesperados
});

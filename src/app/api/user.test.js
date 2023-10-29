/**
 * @jest-environment node
 */

jest.mock("next/server");
jest.mock("../../libs/mongodb");
jest.mock("axios");

// Mockeando el modelo USUARIOS
const mockSave = jest.fn();
jest.mock("../../models/usuarios", () => {
  return jest.fn().mockImplementation(() => {
    return { save: mockSave };
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
const { createMocksRequest } = require("node-mocks-http");
const { POST } = require("./user/route");
const axios = require("axios");
const USUARIOS = require("../../models/usuarios");
const { connectDB } = require("../../libs/mongodb");

describe('POST /api/users', () => {

    it('successfully creates a user', async () => {
      const mockJson = jest.fn().mockResolvedValue({ 
        name: 'John', 
        address: '123 Street', 
        phone: '1234567890' 
      });



      const mockRequest = {
        json: mockJson
      };

      // Configurar el mock para el método save
      mockSave.mockResolvedValue({ _id: 'someId' });

      // Mocking connectDB
      connectDB.mockResolvedValue();

      const response = await POST(mockRequest);
  
      expect(mockJson).toHaveBeenCalled();
      expect(connectDB).toHaveBeenCalled();
      expect(mockSave).toHaveBeenCalled();
      expect(mockedJson).toHaveBeenCalledWith({ status: 200 });
    });


});

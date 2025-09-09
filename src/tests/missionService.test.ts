import { MissionService } from '../services/mission';
import { MissionPayload, MissionUpdatePayload } from '../types/missionInfoInterface';

// Mock all database models before importing
jest.mock('../database/models/mission', () => ({
    Mission: {
        create: jest.fn(),
        findByPk: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn()
    }
}));

jest.mock('../database/models', () => ({
    Budget: {
        create: jest.fn(),
        findOne: jest.fn(),
        belongsTo: jest.fn(),
        update: jest.fn()
    },
    MissDoc: {
        create: jest.fn(),
        destroy: jest.fn(),
        belongsTo: jest.fn()
    }
}));

// Import after mocking
import { Mission } from '../database/models/mission';
import { MissDoc } from '../database/models';

describe('MissionService', () => {
    let missionService: MissionService;

    beforeEach(() => {
        missionService = new MissionService();
        jest.clearAllMocks();
    });

    describe('createMission', () => {
        it('should create a mission successfully with budget and documents', async () => {
            const payload: MissionPayload = {
                title: 'Test Mission',
                description: 'Test Description',
                location: 'Test Location',
                jobPosition: 'Test Position',
                status: 'pending',
            
                documents: [{
                    documentName: 'test.pdf',
                    documentUrl: 'http://localhost:5000/uploads/test.pdf'
                }]
            };

            const mockMission = { id: '1', ...payload };
            const mockDoc = { id: '1', missionId: '1', ...payload.documents[0] };

            (Mission.create as jest.Mock).mockResolvedValue(mockMission);
            (MissDoc.create as jest.Mock).mockResolvedValue(mockDoc);

            const result = await missionService.createMission(payload);

            expect(Mission.create).toHaveBeenCalledWith(payload);
          
            expect(MissDoc.create).toHaveBeenCalledWith({
                missionId: '1',
                ...payload.documents[0]
            });
            expect(result).toEqual(mockMission);
        });

        it('should create mission without documents when documents is null', async () => {
            const payload: MissionPayload = {
                title: 'Test Mission',
                description: 'Test Description',
                location: 'Test Location',
                jobPosition: 'Test Position',
                status: 'pending',
                documents: null as any
            };

            const mockMission = { id: '1', ...payload };

            (Mission.create as jest.Mock).mockResolvedValue(mockMission);

            const result = await missionService.createMission(payload);

            expect(Mission.create).toHaveBeenCalledWith(payload);
            expect(MissDoc.create).not.toHaveBeenCalled();
            expect(result).toEqual(mockMission);
        });
    });

    describe('updateMission', () => {
        it('should update mission successfully', async () => {
            const mockMission = {
                id: '1',
                title: 'Original Mission',
                update: jest.fn()
            };

            const mockBudget = {
                id: '1',
                missionId: '1',
                update: jest.fn()
            };

            const payload: MissionUpdatePayload = {
                title: 'Updated Mission',
                documents: [{
                    documentName: 'updated.pdf',
                    documentUrl: 'http://localhost:5000/uploads/updated.pdf'
                }]
            };

            (Mission.findByPk as jest.Mock)
                .mockResolvedValueOnce(mockMission) // First call
                .mockResolvedValueOnce(mockMission); // Second call for return
            (MissDoc.destroy as jest.Mock).mockResolvedValue(1);
            (MissDoc.create as jest.Mock).mockResolvedValue({});

            const result = await missionService.updateMission('1', payload);

            expect(mockMission.update).toHaveBeenCalledWith(payload);
            expect(MissDoc.destroy).toHaveBeenCalledWith({ where: { missionId: '1' } });
            expect(MissDoc.create).toHaveBeenCalledWith({
                missionId: '1',
                documentName: 'updated.pdf',
                documentUrl: 'http://localhost:5000/uploads/updated.pdf'
            });
            expect(result).toEqual(mockMission);
        });

        it('should return null if mission not found', async () => {
            (Mission.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await missionService.updateMission('999', {});

            expect(result).toBeNull();
        });
    });

    describe('getMissionById', () => {
        it('should return mission when found', async () => {
            const mockMission = { id: '1', title: 'Test Mission' };
            (Mission.findByPk as jest.Mock).mockResolvedValue(mockMission);

            const result = await missionService.getMissionById('1');

            expect(Mission.findByPk).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockMission);
        });

        it('should return null when mission not found', async () => {
            (Mission.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await missionService.getMissionById('999');

            expect(result).toBeNull();
        });
    });

    describe('getAllMissions', () => {
        it('should return all missions', async () => {
            const missions = [
                { id: '1', title: 'Mission 1' },
                { id: '2', title: 'Mission 2' }
            ];
            (Mission.findAll as jest.Mock).mockResolvedValue(missions);

            const result = await missionService.getAllMissions();

            expect(Mission.findAll).toHaveBeenCalled();
            expect(result).toEqual(missions);
        });
    });

    describe('deleteMission', () => {
        it('should delete mission successfully', async () => {
            const mockMission = {
                id: '1',
                destroy: jest.fn()
            };
            (Mission.findByPk as jest.Mock).mockResolvedValue(mockMission);

            await missionService.deleteMission('1');

            expect(Mission.findByPk).toHaveBeenCalledWith('1');
            expect(mockMission.destroy).toHaveBeenCalled();
        });

        it('should throw error when mission not found', async () => {
            (Mission.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(missionService.deleteMission('999'))
                .rejects.toThrow('Mission not found');
        });
    });
});
class DashboardController {
    constructor(dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    async getInformacionMedica(req, res) {
        try {
            const userId = req.user.id;
            const informacion = await this.dashboardRepository.getInformacionMedica(userId);
            
            if (!informacion) {
                return res.json({
                    tipo_sangre: null,
                    alergias: null,
                    medicamentos: null,
                    notas_medicas: null
                });
            }

            res.json(informacion);
        } catch (error) {
            console.error('Error al obtener información médica:', error);
            res.status(500).json({ error: 'Error al obtener información médica' });
        }
    }

    async getContactosEmergencia(req, res) {
        try {
            const userId = req.user.id;
            const contactos = await this.dashboardRepository.getContactosEmergencia(userId);
            res.json(contactos);
        } catch (error) {
            console.error('Error al obtener contactos de emergencia:', error);
            res.status(500).json({ error: 'Error al obtener contactos de emergencia' });
        }
    }

    async updateInformacionMedica(req, res) {
        try {
            const userId = req.user.id;
            const { tipo_sangre, alergias, medicamentos, notas_medicas } = req.body;

            // Validaciones básicas
            if (!tipo_sangre) {
                return res.status(400).json({ error: 'El tipo de sangre es requerido' });
            }

            const result = await this.dashboardRepository.upsertInformacionMedica(userId, {
                tipo_sangre,
                alergias: alergias || null,
                medicamentos: medicamentos || null,
                notas_medicas: notas_medicas || null
            });

            res.json({ message: 'Información médica actualizada correctamente' });
        } catch (error) {
            console.error('Error al actualizar información médica:', error);
            res.status(500).json({ error: 'Error al actualizar información médica' });
        }
    }
}

module.exports = DashboardController;
const pool = require('../database/mysql');

class DashboardRepository {
    async getInformacionMedica(userId) {
        const [rows] = await pool.query(
            'SELECT * FROM informacion_medica WHERE user_id = ?',
            [userId]
        );
        return rows[0];
    }

    async getContactosEmergencia(userId) {
        const [rows] = await pool.query(
            'SELECT * FROM contactos_emergencia WHERE user_id = ? ORDER BY es_principal DESC',
            [userId]
        );
        return rows;
    }

    async upsertInformacionMedica(userId, data) {
        const [existing] = await pool.query(
            'SELECT id FROM informacion_medica WHERE user_id = ?',
            [userId]
        );

        if (existing.length > 0) {
            // Actualizar registro existente
            const [result] = await pool.query(
                `UPDATE informacion_medica 
                SET tipo_sangre = ?,
                    alergias = ?,
                    medicamentos = ?,
                    notas_medicas = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE user_id = ?`,
                [data.tipo_sangre, data.alergias, data.medicamentos, data.notas_medicas, userId]
            );
            return result;
        } else {
            // Crear nuevo registro
            const [result] = await pool.query(
                `INSERT INTO informacion_medica 
                (user_id, tipo_sangre, alergias, medicamentos, notas_medicas)
                VALUES (?, ?, ?, ?, ?)`,
                [userId, data.tipo_sangre, data.alergias, data.medicamentos, data.notas_medicas]
            );
            return result;
        }
    }
}

module.exports = DashboardRepository;
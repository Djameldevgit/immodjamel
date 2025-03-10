const Reports = require('../models/reportModel');
const Posts = require('../models/postModel');
const Users = require('../models/userModel');

const reportCtrl = {
    // 🟢 Crear un reporte
    createReport: async (req, res) => {
        try {
            const { postId, reason } = req.body;
            const userId = req.user._id; // ID del usuario que reporta (obtenido del token)

            // Verificar si el post existe
            const post = await Posts.findById(postId);
            if (!post) {
                return res.status(404).json({ msg: "El post no fue encontrado." });
            }

            // Verificar si el usuario ya reportó este post
            const existingReport = await Reports.findOne({ postId, userId });
            if (existingReport) {
                return res.status(400).json({ msg: "Ya has reportado este post." });
            }

            // Crear el reporte
            const newReport = new Reports({
                postId,
                userId,
                reason,
            });

            // Guardar el reporte en la base de datos
            await newReport.save();

            res.status(201).json({
                success: true,
                message: "Reporte creado correctamente.",
                report: newReport,
            });
        } catch (err) {
            console.error("Error al crear el reporte:", err);
            res.status(500).json({ error: "Error al crear el reporte." });
        }
    },

    // 🟢 Obtener todos los reportes
    getReports: async (req, res) => {
        try {
            const reports = await Reports.find()
                .populate('postId', 'content') // Populate para obtener detalles del post
                .populate('userId', 'username avatar'); // Populate para obtener detalles del usuario

            res.status(200).json({
                success: true,
                reports,
            });
        } catch (err) {
            console.error("Error al obtener los reportes:", err);
            res.status(500).json({ error: "Error al obtener los reportes." });
        }
    },

    // 🟢 Eliminar un reporte
    deleteReport: async (req, res) => {
        try {
            const { id } = req.params; // ID del reporte a eliminar

            // Buscar y eliminar el reporte
            const deletedReport = await Reports.findByIdAndDelete(id);

            if (!deletedReport) {
                return res.status(404).json({ msg: "Reporte no encontrado." });
            }

            res.status(200).json({
                success: true,
                message: "Reporte eliminado correctamente.",
                report: deletedReport,
            });
        } catch (err) {
            console.error("Error al eliminar el reporte:", err);
            res.status(500).json({ error: "Error al eliminar el reporte." });
        }
    },
};

module.exports = reportCtrl;
const fs = require('fs');
const narrationService = require('../services/narrationService');

class NarrationController {
  /**
   * POST /api/narration/lesson
   * Gera ou retorna do cache a narração de uma aula
   */
  async getLessonNarration(req, res, next) {
    // A Edev utiliza a Web Speech API nativa do navegador para narração de aulas.
    // Nenhuma chamada externa a APIs pagas é executada.
    return res.status(200).json({
      status: 'success',
      message: 'Narração nativa Web Speech API ativa na plataforma Edev.',
      data: null
    });
  }

  /**
   * GET /api/narration/audio/:filename
   * Serve o arquivo de áudio MP3 com suporte a Range requests (streaming e seek do navegador)
   */
  async streamAudio(req, res, next) {
    try {
      const { filename } = req.params;
      const audioPath = narrationService.getAudioPath(filename);

      if (!audioPath) {
        return res.status(404).json({
          status: 'error',
          message: 'Áudio não encontrado no cache.'
        });
      }

      const stat = fs.statSync(audioPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      // Headers essenciais para streaming de mídia cross-origin (CORS + CORP)
      const originHeader = req.headers.origin || '*';
      const commonHeaders = {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Access-Control-Allow-Origin': originHeader,
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Range, Content-Type',
        'Access-Control-Expose-Headers': 'Content-Range, Content-Length, Accept-Ranges'
      };

      if (range) {
        // Suporte a Range header para seek perfeito no elemento <audio>
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(audioPath, { start, end });

        const head = {
          ...commonHeaders,
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          ...commonHeaders,
          'Content-Length': fileSize,
          'Accept-Ranges': 'bytes',
        };
        res.writeHead(200, head);
        fs.createReadStream(audioPath).pipe(res);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NarrationController();

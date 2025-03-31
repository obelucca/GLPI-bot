const { SlashCommandBuilder } = require('discord.js');
const dayjs = require('dayjs');
require('dayjs/locale/pt-br');

dayjs.locale('pt-br');

const equipe = ['Gabriel', 'João', 'Cléber'];
const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('digisac_dia')
        .setDescription('Informa a escala de acesso ao Digisac para duas semanas.'),

    async execute(interaction) {
        const hoje = dayjs();
        let diaAtual = hoje.startOf('week').add(1, 'day');
        
        // Encontrar o primeiro dia útil a partir da data atual
        while (diaAtual.day() === 6 || diaAtual.day() === 0) {
            diaAtual = diaAtual.add(1, 'day');
        }

        // Calcular o responsável correto baseado na rotação
        const inicioReferencia = dayjs('2025-03-31'); // Data fixa do primeiro responsável
        const diffDiasUteis = [...Array(diaAtual.diff(inicioReferencia, 'day'))]
            .map((_, i) => inicioReferencia.add(i, 'day'))
            .filter(d => d.day() !== 6 && d.day() !== 0).length; // Conta apenas dias úteis
        
        let indexResponsavel = Math.floor(diffDiasUteis / 2) % equipe.length;
        let resposta = '📅 **Escala de Acesso ao Digisac (Próximas 2 Semanas):**\n\n';
        
        for (let i = 0; i < 10; i++) { // 10 dias úteis
            if (diaAtual.day() === 6) diaAtual = diaAtual.add(2, 'day'); // Se for sábado, pula para segunda
            if (diaAtual.day() === 0) diaAtual = diaAtual.add(1, 'day'); // Se for domingo, pula para segunda
            
            const responsavel = equipe[indexResponsavel];
            const dataFormatada = diaAtual.format('DD/MM/YYYY');
            const diaSemana = diasSemana[diaAtual.day()];
            resposta += `📌 (${dataFormatada}) - ${diaSemana} - **${responsavel}**\n`;
            
            if (i % 2 === 1) indexResponsavel = (indexResponsavel + 1) % equipe.length; // Troca a cada 2 dias úteis
            diaAtual = diaAtual.add(1, 'day');
        }

        await interaction.reply(resposta);
    }
};

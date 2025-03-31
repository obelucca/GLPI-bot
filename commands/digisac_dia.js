const { SlashCommandBuilder } = require('discord.js');
const dayjs = require('dayjs');
require('dayjs/locale/pt-br');

dayjs.locale('pt-br');

const equipe = ['Gabriel', 'João', 'Cleber'];
const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('digisac_dia')
        .setDescription('Informa a escala de acesso ao Digisac para duas semanas.'),

    async execute(interaction) {
        const hoje = dayjs();
        let inicioReferencia = hoje.startOf('week').add(1, 'day');
        
        let resposta = '📅 **Escala de Acesso ao Digisac (Próximas 2 Semanas):**\n\n';
        let diaAtual = inicioReferencia;
        let indexResponsavel = Math.floor(diaAtual.diff(dayjs('2025-03-31'), 'day') / 2) % equipe.length;

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

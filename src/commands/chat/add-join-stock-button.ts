import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    PermissionsString,
} from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/language.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class AddJoinStockButtonCommand implements Command {
    public names = [Lang.getRef('chatCommands.add-join-stock-button', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, _data: EventData): Promise<void> {
        try {
            const welcomeMessage = 
                '# 주식게임에 기여하고 싶으신가요?\n' +
                '## :art: 기획 및 디자인팀 (Planning & Design Team)\n' +
                '- 주식게임에 대한 전반적인 기획&디자인 등을 진행해요.\n' +
                '- 추천직군: 전직군\n' +
                '## :tools: 서비스 개발팀 (Service Development Team)\n' +
                '- 주식게임에 대한 프론트엔드/백엔드 개발을 진행해요.\n' +
                '- 추천직군: 개발자\n' +
                '## :railway_track: 플랫폼 개발팀 (Platform Enginner Team)\n' +
                '- 주식게임의 CI/CD, 테스트, 인프라, 생산성개선, 퍼포먼스향상 등등의 엔지니어링을 진행해요.\n' +
                '- 추천직군: 개발자';

                const buttonPlanDesign = new ButtonBuilder()
                .setCustomId('join_stock_plan_design')
                .setLabel('기획/디자인팀 합류하기')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🎨');

            const buttonDevService = new ButtonBuilder()
                .setCustomId('join_stock_dev_service')
                .setLabel('서비스 개발팀 합류하기')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🛠️');

            const buttonDevPlatform = new ButtonBuilder()
                .setCustomId('join_stock_dev_platform')
                .setLabel('플랫폼 개발팀 합류하기')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🛤️');

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(buttonPlanDesign, buttonDevService, buttonDevPlatform);

            await intr.channel.send({
                content: welcomeMessage,
                components: [row]
            });

            await InteractionUtils.send(intr, '메시지가 성공적으로 생성되었습니다.', true);
        } catch (error) {
            await InteractionUtils.send(intr, '버튼 추가 중 오류가 발생했습니다.', true);
            console.error(error);
        }
    }
}

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

export class AddJoinCommunityButtonCommand implements Command {
    public names = [Lang.getRef('chatCommands.add-join-community-button', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, _data: EventData): Promise<void> {
        try {
            const welcomeMessage = 
                '# 소셜데브클럽 커뮤니티 중심에 기여하고 싶으신가요?\n' +
                '## :gift_heart: 커뮤니티 브랜딩\n' +
                '- 커뮤니티를 발전시키는 기획&디자인&마케팅 등을 진행해요\n' +
                '- 추천직군: 전직군\n' +
                '## :wrench: 커뮤니티 개발자\n' +
                '- 사람들이 커뮤니티에 더 쉽게 녹아들 수 있게 자동화 or 봇개발 등을 진행해요\n' +
                '- 추천직군: 개발자';

            const buttonBranding = new ButtonBuilder()
                .setCustomId('join_community_branding')
                .setLabel('커뮤니티 브랜딩팀 합류하기')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('💝');

            const buttonDeveloper = new ButtonBuilder()
                .setCustomId('join_community_developer')
                .setLabel('커뮤니티 개발팀 합류하기')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🔧');

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(buttonBranding, buttonDeveloper);

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

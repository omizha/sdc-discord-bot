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

export class AddJoinButtonCommand implements Command {
    public names = [Lang.getRef('chatCommands.add-join-button', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, _data: EventData): Promise<void> {
        try {
            const welcomeMessage = 
                '## :space_invader: 소셜데브클럽 합류하는 방법\n' +
                '- 기본 프로필사진이면 변경해주세요!\n' +
                '- 준비가 되었다면, 아래 버튼을 눌러주세요!';

            const button = new ButtonBuilder()
                .setCustomId('join_club')
                .setLabel('합류하기')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(button);

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

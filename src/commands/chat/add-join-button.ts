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
                '- 디스코드 **Player** 권한을 얻으면 합류할 수 있어요.\n' +
                '- **Player** 권한을 얻기 위해서는 아래 조건이 필요해요.\n' +
                '  - 위의 모든 메시지에 이모지를 달아보아요 :sparkling_heart:\n' +
                '  - 기본 프로필사진이면 변경해주세요!';

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

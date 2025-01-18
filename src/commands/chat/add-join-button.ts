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
            const messages = await intr.channel.messages.fetch({ limit: 10 });
            console.log('🚀 ~ AddJoinButtonCommand ~ execute ~ messages:', messages)
            const targetMessage = messages.find(msg =>
                msg.content.includes('소셜데브클럽 합류하는 방법')
            );

            if (!targetMessage) {
                await InteractionUtils.send(intr, '대상 메시지를 찾을 수 없습니다.');
                return;
            }

            const button = new ButtonBuilder()
                .setCustomId('join_club')
                .setLabel('합류하기')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

            await targetMessage.edit({
                components: [row],
            });

            await InteractionUtils.send(intr, '버튼이 성공적으로 추가되었습니다.');
        } catch (error) {
            await InteractionUtils.send(intr, '버튼 추가 중 오류가 발생했습니다.');
            console.error(error);
        }
    }
}

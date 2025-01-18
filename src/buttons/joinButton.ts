import { ButtonInteraction, GuildMember } from 'discord.js';

import { Button, ButtonDeferType } from './button.js';

export class JoinButton implements Button {
    public ids = ['join_club'];
    public deferType = ButtonDeferType.REPLY;
    public requireGuild = true;
    public requireEmbedAuthorTag = false;

    public async execute(intr: ButtonInteraction): Promise<void> {
        const member = intr.member as GuildMember;

    // 먼저 응답을 지연시킵니다
    await intr.deferReply({ ephemeral: true });

        // 기본 프로필 확인
        if (member.user.avatar === null) {
            await intr.editReply({
                content: '기본 프로필 사진을 사용중이시네요! 프로필 사진을 변경해주세요.',
            });
            return;
        }

        // 리액션 확인
        const messages = await intr.channel.messages.fetch({ limit: 10 });
        const targetMessages = messages.filter(
            msg =>
                msg.content.includes('소셜데브클럽 합류하는 방법') ||
                msg.content.includes('Player 권한을 얻기 위해서는')
        );

        let hasAllReactions = true;
        for (const [_, message] of targetMessages) {
            const userReactions = message.reactions.cache.filter(reaction =>
                reaction.users.cache.has(member.id)
            );

            if (userReactions.size === 0) {
                hasAllReactions = false;
                break;
            }
        }

        if (!hasAllReactions) {
            await intr.editReply({
                content: '먼저 위의 모든 메시지에 이모지를 달아주세요!',
            });
            return;
        }

        // Player 역할 부여
        try {
            const playerRole = intr.guild.roles.cache.find(role => role.name === 'Player');
            if (!playerRole) {
                throw new Error('Player 역할을 찾을 수 없습니다.');
            }

            await member.roles.add(playerRole);
            await intr.editReply({
                content: '🎉 축하합니다! Player 권한이 부여되었습니다.',
            });
        } catch (error) {
            console.error(error);
            await intr.editReply({
                content: '역할 부여 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
            });
        }
    }
}

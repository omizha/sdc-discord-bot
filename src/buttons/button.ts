import { ButtonInteraction } from 'discord.js';

import { EventData } from '../models/internal-models.js';

export interface Button {
    ids: string[];
    deferType: ButtonDeferType;
    requireGuild: boolean;
    requireEmbedAuthorTag: boolean;
    execute(intr: ButtonInteraction, data: EventData): Promise<void>;
}

export enum ButtonDeferType {
    REPLY = 'REPLY',
    REPLY_EPHEMERAL = 'REPLY_EPHEMERAL',
    UPDATE = 'UPDATE',
    NONE = 'NONE',
}
